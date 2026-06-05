import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import type { RegisterForm } from '../types'
import ErrorMessage from '../Components/ErrorMessage'
import api from '../config/Axios'

export default function RegisterView() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialValues: RegisterForm = {
    name: '',
    email: '',
    handle: location?.state?.handle || '',
    password: '',
    password_confirmation: ''
  }

  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('password')

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(`/auth/register`, formData)
      toast.success(data)
      reset()
      navigate('/auth/login')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Registro</p>
        <h1 className='text-4xl font-black text-white sm:text-5xl'>Crear Cuenta</h1>
        <p className="max-w-md text-sm leading-6 text-slate-300">Crea tu perfil, configura tu usuario y arma una presencia limpia dentro de DevTree.</p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-10 space-y-6 rounded-[28px] border border-white/10 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-10"
      >
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="name" className="text-sm font-bold uppercase tracking-wide text-slate-500">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register('name', {
              required: "El Nombre es obligatorio"
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register('email', {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="handle" className="text-sm font-bold uppercase tracking-wide text-slate-500">Usuario</label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register('handle', {
              required: "El Usuario es obligatorio"
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="password" className="text-sm font-bold uppercase tracking-wide text-slate-500">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register('password', {
              required: "La Contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe ser mínima de 8 caracteres"
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="password_confirmation" className="text-sm font-bold uppercase tracking-wide text-slate-500">Repetir Contraseña</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register('password_confirmation', {
              required: "Repetir Contraseña es obligatorio",
              validate: (value) => value === password || 'Las contraseñas no son iguales'
            })}
          />

          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-lg font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
          value='Crear Cuenta'
        />
      </form>

      <nav className='mt-10'>
        <Link
          className='block text-center text-sm font-semibold text-slate-300 transition hover:text-white'
          to="/auth/login"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>
      </nav>
    </>
  )
}
