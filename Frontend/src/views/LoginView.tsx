import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import ErrorMessage from '../Components/ErrorMessage'
import { LoginForm } from '../types'
import api from '../config/Axios'

export default function LoginView() {

  const navigate = useNavigate()
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      navigate('/admin')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Acceso</p>
        <h1 className='text-4xl font-black text-white sm:text-5xl'>Iniciar Sesión</h1>
        <p className="max-w-md text-sm leading-6 text-slate-300">Entra para administrar tu perfil, editar tus enlaces y mantener tu DevTree actualizado.</p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 space-y-6 rounded-[28px] border border-white/10 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-10"
        noValidate
      >
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="password" className="text-sm font-bold uppercase tracking-wide text-slate-500">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
            {...register("password", {
              required: "La Contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-lg font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
          value='Iniciar Sesión'
        />
      </form>


      <nav className='mt-10'>
        <Link
          className='block text-center text-sm font-semibold text-slate-300 transition hover:text-white'
          to="/auth/register"
        >¿No tienes cuenta? Crea una aquí</Link>
      </nav>
    </>
  )
}
