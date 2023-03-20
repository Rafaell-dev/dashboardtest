import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      cnh,
      reservedVehicle,
      city,
      state,
      country,
      phoneNumber
    } = req.body

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role,
      cnh,
      reservedVehicle,
      city,
      state,
      country,
      phoneNumber
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Ocorreu um erro interno' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    console.log(user)
    if (!user) return res.status(400).json({ msg: 'Usuário não existe' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({
        msg: 'Credenciais inválidas'
      })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ token, user })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'Ocorreu um erro interno' })
  }
}

export const updateUser = async (req, res) => {
  const { password, _id } = req.body

  try {
    const user = await findUserById(_id) // Encontra o usuário pelo ID.

    await updatePassword(user, password) // Atualiza a senha do usuário.

    res.status(200).json({ message: 'Senha alterada com sucesso' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocorreu um erro interno' })
  }
}

// Função para encontrar um usuário pelo ID.
const findUserById = async userId => {
  const user = await User.findById(userId)

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  return user
}

// Função para atualizar a senha de um usuário.
const updatePassword = async (user, newPassword) => {
  const salt = await bcrypt.genSalt() // Gera um salt aleatório.
  const passwordHash = await bcrypt.hash(newPassword, salt) // Gera um hash da nova senha usando o salt.

  user.password = passwordHash // Atualiza a senha do usuário.
  user.forcePasswordChange = false // Define que não é necessário forçar a mudança de senha no próximo login.
  await user.save() // Salva as alterações no banco de dados.
}
