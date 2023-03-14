import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'

// import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'

import veiculoRoutes from './routes/veiculo.js'
import motoristaRoutes from './routes/motorista.js'
import retiradaRoutes from './routes/retirada.js'

// Config
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//Importação de dados
// import motorista from './models/motorista.js'
// import { dataMotoristas } from './data/motoristas.js'

// import Veiculo from './models/veiculo.js'
// import { dataVeiculos } from './data/veiculos.js'

// import User from './models/User.js'
// import { dataUser } from './data/index.js'

// Rotas
// app.use('/motoristas', motoristaRoutes)
app.use('/motorista', motoristaRoutes)
app.use('/veiculo', veiculoRoutes)
app.use('/general', generalRoutes)
app.use('/retirada', retiradaRoutes)

// Mongoose config
mongoose.set('strictQuery', true)

const PORT = process.env.PORT || 8000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    // Only add data one time

    // User.insertMany(dataUser)
    // motorista.insertMany(dataMotoristas)
    // Veiculo.insertMany(dataVeiculos)
  })
  .catch(error =>
    console.log(`${error}\n não foi possivel estabelecer conexão`)
  )
