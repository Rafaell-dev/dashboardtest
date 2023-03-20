import express from 'express'
import {
  getUsers,
  getUsersSearch,
  getUserById,
  postCreateUser,
  putUser,
  deleteUser
} from '../controllers/user.js'

const router = express.Router()

router.get('/getUsers', getUsers)
router.get('/userById/:id', getUserById)
router.get('/UsersSearch', getUsersSearch)
router.post('/createUser', postCreateUser)
router.put('/updateUser/:id', putUser)
router.delete('/deleteUser/:id', deleteUser)

export default router
