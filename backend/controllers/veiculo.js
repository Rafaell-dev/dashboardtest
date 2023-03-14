import Veiculo from '../models/Veiculo.js'

// Create
export const postCreateVeiculo = async (req, res) => {
  const {
    plate,
    brand,
    model,
    color,
    chassi,
    status,
    activeStatus,
    vehicle,
    fuel,
    year,
    description,
    sequence
  } = req.body

  const newVeiculo = new Veiculo({
    plate,
    brand,
    model,
    color,
    chassi,
    status,
    activeStatus,
    vehicle,
    fuel,
    year,
    description,
    sequence
  })

  try {
    await newVeiculo.save()

    res.status(201).json(newVeiculo)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

//Read
export const getVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.find()
    res.status(200).json(veiculos)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Read by id
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

//Update by id
export const putVeiculo = async (req, res) => {
  const id = req.params.id
  await Veiculo.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Veiculo não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Veiculo Atualizado.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}

//Delete
export const deleteVeiculo = async (req, res) => {
  await Veiculo.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Veiculo não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Veiculo Removido.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}
