import Veiculo from '../models/Veiculo.js'
import Motorista from '../models/motorista.js'

export const getVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.find()
    res.status(200).json(veiculos)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getMotoristas = async (req, res) => {
  try {
    const motoristas = await Motorista.find()
    res.status(200).json(motoristas)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getMotoristasSearch = async (req, res) => {
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

    const motoristasSearch = await Motorista.find({
      $or: [
        { name: { $regex: new RegExp(search, 'i') } },
        { city: { $regex: new RegExp(search, 'i') } }
      ]
    })

      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Motorista.countDocuments({
      name: { $regex: search, $options: 'i' }
    })

    res.status(200).json({
      motoristasSearch,
      total
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getVeiculosSearch = async (req, res) => {
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

    const veiculosSearch = await Veiculo.find({
      $or: [
        { plate: { $regex: new RegExp(search, 'i') } },
        { model: { $regex: new RegExp(search, 'i') } }
      ]
    })

      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Veiculo.countDocuments({
      name: { $regex: search, $options: 'i' }
    })

    res.status(200).json({
      veiculosSearch,
      total
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
// Create
export const postCreateMotorista = async (req, res) => {
  const { name, email, cnh, city, state, country, phoneNumber } = req.body

  const newMotorista = new Motorista({
    name,
    email,
    cnh,
    city,
    state,
    country,
    phoneNumber
  })

  try {
    await newMotorista.save()

    res.status(201).json(newMotorista)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
//Update
export const putMotorista = async (req, res) => {
  const id = req.params.id
  await Motorista.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Motorista não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Motorista Atualizado.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}

//Delete
export const deleteMotorista = async (req, res) => {
  await Motorista.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Motorista não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Motorista Removido.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}
