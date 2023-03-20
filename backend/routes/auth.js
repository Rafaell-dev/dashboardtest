import express from 'express'
import { login, register, updateUser } from '../controllers/auth.js'

const router = express.Router()
router.post('/login', login)
router.post('/register', register)
router.put('/updateUser/:id', updateUser)

export default router
