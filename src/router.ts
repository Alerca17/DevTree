import { Router } from 'express'

const router = Router()

//Autenticacion y Registro

router.post('/auth/register', (req, res) => {

    console.log('Registro de usuario:', req.body)                                                                             
})

export default router

//Alercadb - alejandro17 