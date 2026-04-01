import User from "../models/User"
import slug from "slug"
import { Request, Response } from "express"
import { hashPassword } from "../utils/auth"

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        return res.status(409).send('El correo electrónico ya está registrado')
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle })

    if (handleExists) {
        return res.status(409).send('Nombre de usuario no disponible')
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    await user.save()
    res.status(201).send('Usuario creado')
}