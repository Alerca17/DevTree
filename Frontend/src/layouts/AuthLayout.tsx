import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import Logo from '../Components/Logo'
import SearchForm from '../Components/SearchForm'

export default function AuthLayout() {
    const location = useLocation()
    const isAuthRoute = location.pathname.startsWith('/auth')
    const isNotFoundRoute = location.pathname === '/404'
    const isProfileRoute = !isAuthRoute && !isNotFoundRoute

    return (
        <>
            <div className='relative min-h-screen overflow-hidden bg-slate-950 text-white'>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,1),_rgba(2,6,23,1))]" />
                <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

                <div className={`${isProfileRoute ? 'mx-auto max-w-6xl' : 'mx-auto max-w-lg'} relative pt-10 px-5`}>
                    <Logo />

                    {isProfileRoute && (
                        <div className="mt-8">
                            <SearchForm />
                        </div>
                    )}

                    <div className='py-10'>
                        <Outlet />
                    </div>
                </div>
            </div>

            <Toaster position='top-right' />
        </>
    )
}
