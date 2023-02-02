import Veiculo from '../models/veiculo.js'

export const getVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.find()
    res.status(200).json(veiculos)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
