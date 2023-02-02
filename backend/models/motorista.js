import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 32
    },
    email: {
      type: String,
      required: true,
      max: 30,
      unique: true,
      min: 5
    },
    cnh: {
      type: Number,
      required: true,
      length: 11,
      unique: true,
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'admin'
    }
  },
  {
    timestamps: true
  }
)

const motorista = mongoose.model('motorista', UserSchema)
export default motorista