import mongoose from 'mongoose'

const RetiradaSchema = new mongoose.Schema(
  {
    dataRetirada: { type: Date, required: true },
    dataRetorno: { type: Date, required: true },
    driverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'motorista',
      required: true,
    },
    vehicleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veiculo',
      required: true,
    },
    statusRetirada: {
      type: String,
      enum: ['Encerrado', 'Pendente', 'Aberto'],
      default: 'Aberto'
    }
  },
  { timestamps: true }
)

const Retirada = mongoose.model('Retirada', RetiradaSchema)
export default Retirada
