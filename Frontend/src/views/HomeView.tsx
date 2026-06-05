import Header from "../Components/Header";
import SearchForm from "../Components/SearchForm";

export default function HomeView() {
    return (
        <>
            <Header />

            <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
                <div className=" max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Todas tus <span className="text-cyan-400">Redes Sociales </span>
                            en un enlace
                        </h1>

                        <p className="text-slate-800 text-xl">Forma parte de una comunidad donde la tecnología une a personas con intereses, proyectos e ideas en común. Comparte tus redes sociales, conecta con otros profesionales y estudiantes, descubre contenido de valor y construye relaciones que impulsen tu crecimiento personal y profesional dentro del ecosistema tecnológico.

                        </p>

                        <SearchForm />
                    </div>
                </div>
            </main>
        </>
    )
}
