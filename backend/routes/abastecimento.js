import express from 'express'
import {
  getAbastecimentos,
  getAbastecimentoById,
  createAbastecimento,
  updateAbastecimentoById,
  deleteAbastecimentoById,
  getAbastecimentoSearch
} from '../controllers/abastecimento.js'

const router = express.Router()

// Rota para listar todos os abastecimentos
router.get('/abastecimentos', getAbastecimentos)

// Rota para buscar um abastecimento pelo ID
router.get('/abastecimentos/:id', getAbastecimentoById)

// Rota para criar um novo abastecimento
router.post('/createAbastecimento', createAbastecimento)

// Rota para atualizar um abastecimento pelo ID
router.put('/updateAbastecimento/:id', updateAbastecimentoById)

// Rota para deletar um abastecimento pelo ID
router.delete('/deleteAbastecimento/:id', deleteAbastecimentoById)

// Rota para buscar abastecimentos com filtro e paginação
router.get('/abastecimentosSearch', getAbastecimentoSearch)

export default router
