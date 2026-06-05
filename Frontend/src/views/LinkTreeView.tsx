import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { social } from "../data/social"
import DevTreeInput from "../Components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { updateProfile } from "../api/DevtreeApi"
import { SocialNetwork, User } from "../types"

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Actualizado Correctamente')
    }
  })

  useEffect(() => {
    const updatedData = devTreeLinks.map(item => {
      const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
      if (userlink) {
        return { ...item, url: userlink.url, enabled: userlink.enabled }
      }
      return item
    })
    setDevTreeLinks(updatedData)
  }, [])


  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
    setDevTreeLinks(updatedLinks)
  }

  const links: SocialNetwork[] = JSON.parse(user.links)

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          toast.error('URL no Válida')
        }
      }
      return link
    })

    setDevTreeLinks(updatedLinks)

    let updatedItems: SocialNetwork[] = []
    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
    if (selectedSocialNetwork?.enabled) {
      const id = links.filter(link => link.id).length + 1
      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id
            }
          } else {
            return link
          }
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id
        }
        updatedItems = [...links, newItem]
      }
    } else {
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        } else {
          return link
        }
      })
    }

    // Almacenar en la base de datos
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    })
  }

  return (
    <>
      <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-10">
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-600">Links</p>
          <h2 className="text-3xl font-black text-slate-900">Gestiona tus enlaces</h2>
          <p className="max-w-2xl text-sm text-slate-500">Activa, desactiva y ordena tus redes con una interfaz más limpia y moderna.</p>
        </div>

        <div className="space-y-4">
          {devTreeLinks.map(item => (
            <DevTreeInput
              key={item.name}
              item={item}
              handleUrlChange={handleUrlChange}
              handleEnableLink={handleEnableLink}
            />
          ))}
          <button
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-lg font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            onClick={() => mutate(queryClient.getQueryData(['user'])!)}
          >Guardar Cambios</button>
        </div>
      </div>
    </>
  )
}
