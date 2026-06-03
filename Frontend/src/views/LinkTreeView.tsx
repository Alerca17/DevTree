import { useEffect, useState } from "react";
import { social } from "../data/socail";
import DevTreeInput from "../Components/DevTreeInput";
import { isValidUrl } from "../utils/Utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevtreeApi";
import { SocialNetwork, User } from "../types";

export default function LinkTreeView() {
	const [devTreeLinks, setDevTreeLinks] = useState(social);
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>(["user"]);

	const { mutate } = useMutation({
		mutationFn: updateProfile,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			toast.success("Perfil actualizado correctamente!");
		},
	});

	useEffect(() => {
		if (!user) return;
		let parsedUserLinks: SocialNetwork[] = [];
		try {
			parsedUserLinks = JSON.parse(user.links);
		} catch (e) {
			parsedUserLinks = [];
		}

		const updatedData = social.map((item) => {
			const userLink = parsedUserLinks.find(
				(link: SocialNetwork) => link.name === item.name,
			);
			if (userLink) {
				return {
					...item,
					url: userLink.url,
					enabled: userLink.enabled,
				};
			}
			return item;
		});
		setDevTreeLinks(updatedData);
	}, [user?.links]);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedLinks = devTreeLinks.map((link) =>
			link.name === e.target.name ? { ...link, url: e.target.value } : link,
		);

		setDevTreeLinks(updatedLinks);
	};

	const parsedLinks: SocialNetwork[] = (() => {
		if (!user) return [];
		try {
			return JSON.parse(user.links) as SocialNetwork[];
		} catch (e) {
			return [];
		}
	})();

	const handleEnableLink = (socialNetwork: string) => {
		const updatedLinks = devTreeLinks.map((link) => {
			if (link.name === socialNetwork) {
				if (isValidUrl(link.url)) {
					return { ...link, enabled: !link.enabled };
				} else {
					toast.error(
						"URL no válida. Por favor, ingresa una URL válida antes de habilitar el enlace.",
					);
				}
			}

			return link;
		});

		setDevTreeLinks(updatedLinks);
		let updatedItems: SocialNetwork[] = [];
		const selectSocialNetwork = updatedLinks.find(
			(link) => link.name === socialNetwork,
		);
		if (selectSocialNetwork?.enabled) {
			const id = parsedLinks.filter((link) => link.id).length + 1;
			if (parsedLinks.some((link) => link.name === socialNetwork)) {
				updatedItems = parsedLinks.map((link) => {
					if (link.name === socialNetwork) {
						return {
							...link,
							enabled: true,
							id,
						};
					} else {
						return link;
					}
				});
			} else {
				const newItem = {
					...selectSocialNetwork,
					id,
				};
				updatedItems = [...parsedLinks, newItem];
			}
		} else {
			const indexToUpdate = parsedLinks.findIndex(
				(link) => link.name === socialNetwork,
			);
			updatedItems = parsedLinks.map((link) => {
				if (link.name === socialNetwork) {
					return {
						...link,
						id: 0,
						enabled: false,
					};
				} else if (link.id > indexToUpdate) {
					return {
						...link,
						id: link.id - 1,
					};
				} else {
					return link;
				}
			});
		}
		queryClient.setQueryData(["user"], (prevData: User) => {
			return {
				...prevData,
				links: JSON.stringify(updatedItems),
			};
		});
	};
	return (
		<>
			<div className="space-y-4">
				{devTreeLinks.map((item) => (
					<DevTreeInput
						key={item.name}
						item={item}
						handleUrlChange={handleUrlChange}
						handleEnableLink={handleEnableLink}
					/>
				))}
				<button
					className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
					onClick={() => user && mutate(user)}
					disabled={!user}
				>
					Guardar Cambios
				</button>
			</div>
		</>
	);
}
