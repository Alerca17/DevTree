import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SocialNetwork } from "../types"

type DevTreeLinkProps = {
  link: SocialNetwork
}

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: link.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white shadow-lg shadow-black/10"
      {...attributes}
      {...listeners}
    >
      <div
        className="h-12 w-12 rounded-xl bg-cover bg-center ring-1 ring-white/10"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <p className="capitalize text-sm text-slate-200">Visita mi: <span className="font-bold text-white">{link.name}</span></p>
    </li>
  )
}
