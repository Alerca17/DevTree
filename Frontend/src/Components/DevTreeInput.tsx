import { Switch } from '@headlessui/react'
import { DevTreeLink } from "../types"
import { classNames } from '../utils'

type DevTreeInputProps = {
	item: DevTreeLink
	handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleEnableLink: (socialNetwork: string) => void
}

export default function DevTreeInput({ item, handleUrlChange, handleEnableLink }: DevTreeInputProps) {

	return (
		<div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:border-cyan-200 hover:bg-white">
			<div
				className="h-12 w-12 rounded-2xl bg-slate-900/5 bg-cover bg-center ring-1 ring-slate-200"
				style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
			></div>

			<input
				type="text"
				className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
				value={item.url}
				onChange={handleUrlChange}
				name={item.name}
			/>

			<Switch
				checked={item.enabled}
				name={item.name}
				onChange={() => handleEnableLink(item.name)}
				className={classNames(
					item.enabled ? 'bg-cyan-500' : 'bg-slate-300',
					'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
				)}
			>
				<span
					aria-hidden="true"
					className={classNames(
						item.enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
					)}
				/>
			</Switch>
		</div>
	)
}
