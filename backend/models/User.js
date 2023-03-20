import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      min: 5
    },
    password: {
      type: String,
      required: true,
      min: 8
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },
    cnh: {
      type: Number,
      required: false,
      length: 11,
      unique: true
    },
    reservedVehicle: {
      type: Boolean,
      default: false
    },
    city: String,
    state: String,
    country: { type: String, default: 'BR' },
    phoneNumber: String,
    forcePasswordChange: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema)
export default User
