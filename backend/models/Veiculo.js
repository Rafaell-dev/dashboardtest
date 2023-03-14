import mongoose from 'mongoose'

const VeiculoSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    chassi: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['disponivel', 'reservado', 'manutenção'],
      default: 'disponivel'
    },
    activeStatus: {
      type: Boolean,
      default: true
    },
    vehicle: {
      type: String,
      enum: ['Carro', 'Caminhão', 'Moto'],
      default: 'carro'
    },
    fuel: {
      type: String,
      enum: ['Gasolina', 'Álcool', 'Diesel'],
      default: 'gasolina'
    },
    year: Date,
    description: String,
    sequence: String,
    
  },
  { timestamps: true }
)

const Veiculo = mongoose.model('Veiculo', VeiculoSchema)
export default Veiculo
