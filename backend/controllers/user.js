import User from '../models/User.js'

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find()
    res.status(200).json(Users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUsersSearch = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query

    const generateSort = () => {
      const sortParsed = JSON.parse(sort)
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1)
      }
      return sortFormatted
    }
    const sortFormatted = Boolean(sort) ? generateSort() : {}

    const UsersSearch = await User.find({
      $or: [
        { name: { $regex: new RegExp(search, 'i') } },
        { city: { $regex: new RegExp(search, 'i') } }
      ]
    })

      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await User.countDocuments({
      name: { $regex: search, $options: 'i' }
    })

    res.status(200).json({
      UsersSearch,
      total
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const User = await User.findById(req.params.id)
    if (!User) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
    res.json(User)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao buscar Usuário.' })
  }
}

// Create
export const postCreateUser = async (req, res) => {
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

  const newUser = new User({
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
  })

  try {
    await newUser.save()

    res.status(201).json(newUser)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
//Update
export const putUser = async (req, res) => {
  const id = req.params.id
  await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Usuário não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Usuário Atualizado.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}

//Delete
export const deleteUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Usuário não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Usuário Removido.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}
