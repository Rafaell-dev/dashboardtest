import * as Yup from 'yup'

const phoneRule = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

const currentYear = new Date().getFullYear()
const cnhRule = /^[A-Z]{2}\d{9}$/

console.log(currentYear)

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .max(25, 'Nome longo demais!')
    .required('Campo obrigatório'),
  email: Yup.string().email('Email invalido').required('Campo obrigatório'),
  cnh: Yup.string()
    .typeError('CNH deve ser um número inteiro')
    .max(11, 'CNH maior que o tamanho permitido')
    .required('Campo obrigatório'),
  state: Yup.string().required('Campo obrigatório'),
  city: Yup.string().required('Campo obrigatório'),
  phoneNumber: Yup.string()
    .matches(phoneRule, {
      message: 'Celular inválido, formato correto: (xx) xxxxx-xxxx'
    })
    .required('Campo obrigatório'),
  birthday: Yup.date().required('Obrigatório!')
})

export const veiculoSchema = Yup.object().shape({
  plate: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  brand: Yup.string().required('Campo obrigatório'),
  model: Yup.string().required('Campo obrigatório'),
  color: Yup.string().required('Campo obrigatório'),
  chassi: Yup.string().required('Campo obrigatório'),
  vehicle: Yup.string().required('Campo obrigatório'),
  fuel: Yup.string().required('Campo obrigatório'),
  year: Yup.date().required('Campo obrigatório')
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório')
})

export const retiradaSchema = Yup.object().shape({
  dataRetirada: Yup.date().required('A data de retirada é obrigatória'),
  dataRetorno: Yup.date()
    .min(
      Yup.ref('dataRetirada'),
      'A data de devolução deve ser maior ou igual à data de retirada'
    )
    .required('A data de devolução é obrigatória')
    .test(
      'is-valid-date',
      'A data de devolução deve ser maior ou igual à data de retirada',
      function (value) {
        const dataRetirada = this.resolve(Yup.ref('dataRetirada'))
        if (value && dataRetirada && value < dataRetirada) {
          return false
        }
        return true
      }
    )
})
export const updateUserSchema = Yup.object().shape({
  password: Yup.string()
    .required('Senha é um campo obrigatório')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(20, 'A senha não deve ter mais que 20 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]+$/,
      'A senha deve conter pelo menos uma letra e um número'
    )
})
export const abastecimentoSchema = Yup.object().shape({
  precoLitro: Yup.number()
    .typeError('O valor deve ser numérico')
    .positive('O valor deve ser positivo')
    .required('Campo obrigatório'),
  vehicleID: Yup.string().required('Campo obrigatório'),
  kmAtual: Yup.number()
    .typeError('O valor deve ser numérico')
    .positive('O valor deve ser positivo')
    .required('Campo obrigatório'),
  litros: Yup.number()
    .typeError('O valor deve ser numérico')
    .positive('O valor deve ser positivo')
    .required('Campo obrigatório'),
  dataAbastecimento: Yup.date().required('Campo obrigatório')
})
