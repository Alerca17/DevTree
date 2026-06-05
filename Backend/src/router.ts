import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/Auth'

const router = Router()

/** Autenticacion y Registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El Nombre de Usuario no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La Contraseña es muy corta, mínimo 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('La Contraseña es obligatoria'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El Nombre de Usuario no puede ir vacio'),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('El Nombre de Usuario no puede ir vacio'),
    handleInputErrors,
    searchByHandle
)

export default router