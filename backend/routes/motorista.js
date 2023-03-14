import express from 'express'
import {
  getMotoristas,
  getMotoristasSearch,
  getMotoristaById,
  postCreateMotorista,
  putMotorista,
  deleteMotorista
} from '../controllers/motorista.js'

const router = express.Router()

router.get('/motoristas', getMotoristas)
router.get('/motoristaById/:id', getMotoristaById)
router.get('/motoristasSearch', getMotoristasSearch)
router.post('/createMotorista', postCreateMotorista)
router.put('/updateMotorista/:id', putMotorista)
router.delete('/deleteMotorista/:id', deleteMotorista)

export default router
