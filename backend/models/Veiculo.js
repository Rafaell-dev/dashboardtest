import mongoose from 'mongoose'

const VeiculoSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true, unique: true },
    brand: { type: String, required: true, },
    model: { type: String, required: true, },
    color: { type: String, required: true },
    chassi: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['disponivel', 'reservado'],
      default: 'carro'
    },
    activeStatus: {
      type: Boolean,
      default: true
    },
    vehicle: {
      type: String,
      enum: ['carro', 'caminhão', 'moto'],
      default: 'carro'
    },
    fuel: {
      type: String,
      enum: ['alcool', 'gasolina', 'diesel'],
      default: 'gasolina'
    },
    year: Date
  },
  { timestamps: true }
)

const Veiculo = mongoose.model('Veiculo', VeiculoSchema)
export default Veiculo
