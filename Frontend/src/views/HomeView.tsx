import Header from "../Components/Header";

export default function HomeView() {
    return (
        <>
            <Header />

            <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
                <div className=" max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Busca usuarios <span className="text-cyan-400">registrados</span>
                            en DevTree
                        </h1>

                        <div className="max-w-4xl mx-auto text-center">
                            <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
                                Conecta con una comunidad tecnológica en crecimiento, comparte tu presencia digital y descubre personas, proyectos e iniciativas que impulsan la innovación y el aprendizaje.
                            </p>

                            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                                Busca perfiles públicos por su usuario desde la barra superior y explora rápidamente su información, redes sociales y enlaces en un solo lugar.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
