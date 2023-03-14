import express from 'express'

import {
  postRetirada,
  getRetiradas,
  getRetiradaById,
  updateRetiradaById,
  getRetiradaSearch

} from '../controllers/retirada.js'

const router = express.Router()

router.get('/retiradas', getRetiradas)
router.get('/getRetirada/:id', getRetiradaById)
router.get('/retiradaSearch', getRetiradaSearch)
router.put('/updateRetirada/:id', updateRetiradaById)
router.post('/createRetirada', postRetirada)
export default router
