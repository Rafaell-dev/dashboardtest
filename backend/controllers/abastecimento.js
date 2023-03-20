import Abastecimento from '../models/Abastecimento.js'

// Get all abastecimentos
export const getAbastecimentos = async (req, res) => {
  try {
    const abastecimentos = await Abastecimento.find()
    res.status(200).json(abastecimentos)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Get abastecimentos by ID
export const getAbastecimentoById = async (req, res) => {
  try {
    const abastecimento = await Abastecimento.findById(req.params.id)
    if (!abastecimento) {
      return res.status(404).json({ message: 'Abastecimento não encontrado.' })
    }
    res.json(abastecimento)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao buscar abastecimento.' })
  }
}

// Create new abastecimento
export const createAbastecimento = async (req, res) => {
  const { driverID, vehicleID, fuel, precoLitro, kmAtual, litros, data } =
    req.body

  const newAbastecimento = new Abastecimento({
    driverID,
    vehicleID,
    fuel,
    precoLitro,
    kmAtual,
    litros,
    data
  })

  try {
    await newAbastecimento.save()
    res.status(201).json(newAbastecimento)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Busca abastecimentos com opção de paginação e ordenação
export const getAbastecimentoSearch = async (req, res) => {
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

    const abastecimentoSearch = await Abastecimento.find()

      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Abastecimento.countDocuments({
      name: { $regex: search, $options: 'i' }
    })

    res.status(200).json({
      abastecimentoSearch,
      total
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


// Update abastecimento by ID
export const updateAbastecimentoById = async (req, res) => {
  const id = req.params.id
  await Abastecimento.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Abastecimento não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Abastecimento atualizado.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}

// Delete abastecimento by ID
export const deleteAbastecimentoById = async (req, res) => {
  await Abastecimento.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Abastecimento não encontrado.`
        })
      } else {
        res.status(200).send({ message: 'Abastecimento removido.' })
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
}
