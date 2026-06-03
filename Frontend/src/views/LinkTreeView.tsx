import { useEffect, useState } from "react";
import { social } from "../data/socail";
import DevTreeInput from "../Components/DevTreeInput";
import { isValidUrl } from "../utils/Utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevtreeApi";
import { SocialNetwork, User } from "../types";
export default function LinkTreeView() {
	const [devTreelinks, setDevTreeLinks] = useState(social);
	const queryClient = useQueryClient();
	const user: User = queryClient.getQueryData(["user"])!;

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
		const updatedData = devTreelinks.map((item) => {
			const userLinks = JSON.parse(user.links).find(
				(link: SocialNetwork) => link.name === item.name,
			);
			if (userLinks) {
				return {
					...item,
					url: userLinks.url,
					enabled: userLinks.enabled,
				};
			}
			return item;
		});
		setDevTreeLinks(updatedData);
	}, []);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedLinks = devTreelinks.map((link) =>
			link.name === e.target.name ? { ...link, url: e.target.value } : link,
		);

		setDevTreeLinks(updatedLinks);
	};

	const handleEnableLink = (socialNetwork: string) => {
		const updatedLinks = devTreelinks.map((link) => {
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

		queryClient.setQueryData(["user"], (prevData: User) => {
			return {
				...prevData,
				links: JSON.stringify(updatedLinks),
			};
		});
	};
	return (
		<>
			<div className="space-y-4">
				{devTreelinks.map((item) => (
					<DevTreeInput
						key={item.name}
						item={item}
						handleUrlChange={handleUrlChange}
						handleEnableLink={handleEnableLink}
					/>
				))}
				<button
					className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
					onClick={() => mutate(user)}
				>
					Guardar Cambios
				</button>
			</div>
		</>
	);
}
function useEfect(arg0: () => void, arg1: never[]) {
	throw new Error("Function not implemented.");
}
