import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ErrorMessage from '../Components/ErrorMessage'
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevtreeApi'

export default function ProfileView() {
	const queryClient = useQueryClient()
	const data: User = queryClient.getQueryData(['user'])!

	const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
		defaultValues: {
			handle: data.handle,
			description: data.description
		}
	})

	const updateProfileMutation = useMutation({
		mutationFn: updateProfile,
		onError: (error) => {
			toast.error(error.message)
		},
		onSuccess: (data) => {
			toast.success(data)
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})

	const uploadImageMutation = useMutation({
		mutationFn: uploadImage,
		onError: (error) => {
			toast.error(error.message)
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], (prevData: User) => {
				return {
					...prevData,
					image: data
				}
			})
		}
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			uploadImageMutation.mutate(e.target.files[0])
		}
	}

	const handleUserProfileForm = (formData: ProfileForm) => {
		const user: User = queryClient.getQueryData(['user'])!
		user.description = formData.description
		user.handle = formData.handle
		updateProfileMutation.mutate(user)
	}

	return (
		<form
			className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-10"
			onSubmit={handleSubmit(handleUserProfileForm)}
		>
			<div className="space-y-2 border-b border-slate-100 pb-6">
				<p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-600">Perfil</p>
				<legend className="text-3xl font-black text-slate-900">Editar Información</legend>
				<p className="max-w-2xl text-sm text-slate-500">Ajusta tu Usuario, descripción e imagen de perfil con una presentación más limpia y profesional.</p>
			</div>

			<div className="grid grid-cols-1 gap-2">
				<label
					htmlFor="handle"
					className="text-sm font-bold uppercase tracking-wide text-slate-500"
				>Usuario</label>
				<input
					type="text"
					className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
					placeholder="handle o Nombre de Usuario"
					{...register('handle', {
						required: "El Nombre de Usuario es obligatorio"
					})}
				/>

				{errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
			</div>

			<div className="grid grid-cols-1 gap-2">
				<label
					htmlFor="description"
					className="text-sm font-bold uppercase tracking-wide text-slate-500"
				>Descripción</label>
				<textarea
					className="min-h-40 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
					placeholder="Tu Descripción"
					{...register('description', {
						required: "La Descripción es obligatoria"
					})}
				/>

				{errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
			</div>

			<div className="grid grid-cols-1 gap-2">
				<label
					htmlFor="image"
					className="text-sm font-bold uppercase tracking-wide text-slate-500"
				>Imagen</label>
				<input
					id="image"
					type="file"
					name="image"
					className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-cyan-400 hover:bg-slate-50"
					accept="image/*"
					onChange={handleChange}
				/>
			</div>

			<input
				type="submit"
				className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-lg font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
				value='Guardar Cambios'
			/>
		</form>
	)
}