import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

//Autenticacion y Registro

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede estar vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede estar vacío'),
    body('email')
        .isEmail()
        .withMessage('El correo electrónico no es válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    createAccount
)


router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El correo electrónico no es válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    login
)

export default router