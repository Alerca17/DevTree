import { useForm } from 'react-hook-form'
import slugify from 'react-slugify'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { getUserByHandle } from '../api/DevtreeApi'
import { UserHandle } from '../types'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ErrorMessage from "./ErrorMessage";

export default function SearchForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const mutation = useMutation<UserHandle | undefined, Error, string>({
        mutationFn: getUserByHandle
    })
    
    const handle = watch('handle')

    const handleSearch = () => {
        const slug = slugify(handle)
        if (!slug) {
            return
        }

        mutation.mutate(slug)
    }

    return (
        <div className="relative space-y-3">
            <form
                onSubmit={handleSubmit(handleSearch)}
                className="space-y-3"
            >
                <div className="group relative flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/60 px-3 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.28)] backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-slate-900/75 focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/40">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <label htmlFor="handle" className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-slate-300">
                        @
                    </label>
                    <input
                        type="text"
                        id="handle"
                        autoComplete="off"
                        spellCheck={false}
                        className="min-w-0 flex-1 border-none bg-transparent px-1 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-0 [-webkit-text-fill-color:white] autofill:shadow-[inset_0_0_0_1000px_rgba(15,23,42,0.85)] autofill:[-webkit-text-fill-color:white]"
                        placeholder="Buscar usuario registrado"
                        {...register("handle", {
                            required: "Un Nombre de Usuario es obligatorio",
                        })}
                    />
                    <button
                        type="submit"
                        className="sr-only"
                        aria-label="Buscar usuario"
                    >
                        Buscar
                    </button>
                </div>

                {errors.handle && (
                    <ErrorMessage>{errors.handle.message}</ErrorMessage>
                )}
            </form>

            <div className="relative">
                {mutation.isPending && <p className='text-sm text-slate-600'>Buscando usuario...</p>}
                {mutation.error && <ErrorMessage>{mutation.error.message}</ErrorMessage>}
                {mutation.data && (
                    <div className="absolute left-0 right-0 top-3 z-20 rounded-2xl bg-white/95 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 backdrop-blur-md">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
                                Usuario encontrado
                            </p>
                            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700">
                                Disponible
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {mutation.data.image ? (
                                <img
                                    src={mutation.data.image}
                                    alt={`Imagen de ${mutation.data.handle}`}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-black text-slate-500">
                                    {mutation.data.handle.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-base font-semibold text-slate-900">{mutation.data.name}</p>
                                <p className="truncate text-sm text-slate-500">@{mutation.data.handle}</p>
                            </div>
                        </div>

                        <p className="mt-3 text-sm text-slate-600">
                            {mutation.data.description || 'Este usuario no tiene una descripción pública.'}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                            <p className="truncate text-sm text-slate-500">
                                @{mutation.data.handle}
                            </p>

                            <Link
                                to={`/${mutation.data.handle}`}
                                className="inline-flex text-sm font-semibold text-cyan-700 transition hover:text-cyan-600"
                            >
                                Ver perfil completo
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
