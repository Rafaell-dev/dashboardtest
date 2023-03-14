import express from 'express'
import { getVeiculos, getVeiculosSearch, postCreateVeiculo, putVeiculo, deleteVeiculo } from '../controllers/veiculo.js'

const router = express.Router()

router.get('/veiculos', getVeiculos)
router.get('/veiculosSearch', getVeiculosSearch)
router.post('/createVeiculo', postCreateVeiculo)
router.put('/updateVeiculo/:id', putVeiculo)
router.delete('/deleteVeiculo/:id', deleteVeiculo)

export default router
