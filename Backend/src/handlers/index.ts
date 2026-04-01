import User from "../models/User"
import { validationResult } from "express-validator"
import slug from "slug"
import { Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"

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

export const login = async (req: Request, res: Response) => {

    //Manejar errores de validación
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //Verificar si el usuario existe
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).send('El Usuario no existe')
    }

    //Verificar contraseña
    const isPasswordCorrect = await checkPassword(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(401).send('Contraseña incorrecta')
    }

    res.status(200).send('Login exitoso')
}