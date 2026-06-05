import { useLocation } from 'react-router-dom'
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from './nav/HomeNavigation';
import SearchForm from './SearchForm';
import Logo from './Logo';

export default function Header() {

    const location = useLocation()
    return (
        <header className="border-b border-white/5 bg-slate-950/90 py-5 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full md:w-1/3">
                    <Logo />
                </div>
                <div className="w-full lg:max-w-md lg:flex-1">
                    {location.pathname === '/' && <SearchForm />}
                </div>
                <nav className="md:w-1/3 md:flex md:justify-end">
                    {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
                </nav>
            </div>
        </header>
    )
}
