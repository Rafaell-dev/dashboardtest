import express from 'express'
import { getVeiculos } from '../controllers/veiculo.js'

const router = express.Router()

router.get('/veiculos', getVeiculos)

export default router
