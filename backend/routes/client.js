import express from 'express'
import { getVeiculos, getMotoristas, getVeiculosSearch, getMotoristasSearch } from '../controllers/client.js'

const router = express.Router()

router.get('/veiculos', getVeiculos)
router.get('/motoristas', getMotoristas)
router.get('/veiculosSearch', getVeiculosSearch)
router.get('/motoristasSearch', getMotoristasSearch)

export default router
