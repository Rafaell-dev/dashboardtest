import Retirada from '../models/Retirada.js'
import Veiculo from '../models/Veiculo.js'
import User from '../models/User.js'

// Cria uma nova retirada
export const postRetirada = async (req, res) => {
  try {
    const { vehicleID, driverID, dataRetirada, dataRetorno } = req.body

    // Verifica se o veículo e motorista existem
    const veiculo = await Veiculo.findById(vehicleID)
    const driver = await User.findById(driverID)
    const driverReserved = await Retirada.findOne({
      driverID: driverID,
      statusRetirada: 'Aberto'
    })

    if (!veiculo) {
      return res.status(400).json({ error: 'Veículo não encontrado' })
    }
    if (!driver) {
      return res.status(400).json({ error: 'Motorista não encontrado' })
    }
    if (driverReserved) {
      return res
        .status(400)
        .json({ error: 'Motorista não pode abrir mais de uma reserva' })
    }

    // Cria a nova retirada
    const retirada = new Retirada({
      dataRetirada,
      dataRetorno,
      driverID,
      vehicleID
    })

    // Salva a nova retirada no banco de dados
    await retirada.save()

    veiculo.status = 'reservado'
    await veiculo.save()

    driver.reservedVehicle = true
    await driver.save()
    
    res.status(201).json(retirada)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Não foi possível criar a retirada' })
  }
}

// Lê todas as retiradas
export const getRetiradas = async (req, res) => {
  try {
    const retiradas = await Retirada.find()
      .populate({
        path: 'vehicleID',
        model: 'Veiculo',
        options: { strictPopulate: false }
      })
      .exec()
    res.status(200).json(retiradas)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Não foi possível obter as retiradas' })
  }
}

export const getRetiradaSearch = async (req, res) => {
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

    const retiradaSearch = await Retirada.find()

      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Retirada.countDocuments({
      name: { $regex: search, $options: 'i' }
    })

    res.status(200).json({
      retiradaSearch,
      total
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Atualiza uma retirada pelo ID
export const updateRetiradaById = async (req, res) => {
  try {
    const { id } = req.params
    const { dataRetirada, dataRetorno, driverID, vehicleID, statusRetirada } =
      req.body

    // Busca a retirada pelo ID e atualiza as informações
    const retirada = await Retirada.findByIdAndUpdate(
      id,
      {
        dataRetirada,
        dataRetorno,
        driverID,
        vehicleID,
        statusRetirada
      },
      { new: true }
    )

    if (!retirada) {
      return res.status(404).json({ error: 'Retirada não encontrada' })
    }

    res.status(200).json(retirada)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Não foi possível atualizar a retirada' })
  }
}

export const getRetiradaById = async (req, res) => {
  try {
    const { id } = req.params
    const retirada = await Retirada.findById(id)
      .populate({
        path: 'vehicleID',
        model: 'Veiculo',
        options: { strictPopulate: false }
      })
      .populate('driverID')

    if (!retirada) {
      return res.status(404).json({ error: 'Retirada não encontrada' })
    }

    res.status(200).json(retirada)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Não foi possível obter a retirada' })
  }
}
