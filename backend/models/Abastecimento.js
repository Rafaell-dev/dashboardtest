import mongoose from 'mongoose'

const AbastecimentoSchema = new mongoose.Schema(
  {
    driverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'motorista',
      required: true
    },
    vehicleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veiculo',
      required: true
    },
    fuel: {
      type: String,
      required: true
    },
    precoLitro: {
      type: Number,
      required: true
    },
    kmAtual: {
      type: Number,
    },
    litros: {
      type: Number,
      required: true
    },
    data: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)
const Abastecimento = mongoose.model('Abastecimento', AbastecimentoSchema)
export default Abastecimento
