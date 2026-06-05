import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}
export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return (
        <div className="grid gap-6 text-white lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] lg:items-start">
            <section className="rounded-3xl bg-slate-900/65 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.25)] ring-1 ring-white/10 backdrop-blur-md lg:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                    {data.image && (
                        <div className="mx-auto flex h-56 w-56 shrink-0 items-center justify-center rounded-3xl bg-slate-950/40 p-4 shadow-lg ring-4 ring-white/10 sm:mx-0 sm:h-64 sm:w-64">
                            <img
                                src={data.image}
                                alt={`Foto de ${data.handle}`}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    )}

                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-center text-4xl font-black tracking-tight sm:text-left sm:text-5xl">{data.handle}</p>
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 text-center sm:text-left">Perfil público</p>
                        <p className="mt-4 text-base leading-8 text-slate-100 sm:text-lg">
                            {data.description || 'Este usuario no tiene una descripción pública.'}
                        </p>
                    </div>
                </div>
            </section>

            <aside className="rounded-3xl bg-white/95 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.18)] ring-1 ring-slate-200 backdrop-blur-md lg:sticky lg:top-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600">Links</p>

                <div className="mt-4 flex flex-col gap-4">
                    {links.length ?
                        links.map(link => (
                            <a
                                key={link.name}
                                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                                href={link.url}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <img src={`/social/icon_${link.name}.svg`} alt="imagen red social" className="w-10" />
                                <p className="text-sm font-bold capitalize text-slate-800">Visita mi: {link.name}</p>
                            </a>
                        ))
                        : <p className="text-sm text-slate-500">No hay enlaces en este perfil</p>}
                </div>
            </aside>
        </div>
    )
}
