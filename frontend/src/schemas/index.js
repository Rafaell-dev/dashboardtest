import * as Yup from 'yup'

const phoneRule = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

const currentYear = new Date().getFullYear()
const cnhRule = /^[A-Z]{2}\d{9}$/

console.log(currentYear)

export const motoristaSchema = Yup.object().shape({
  name: Yup.string()
    .max(25, 'Nome longo demais!')
    .required('Campo obrigatório'),
  email: Yup.string().email('Email invalido').required('Campo obrigatório'),
  cnh: Yup.number()
    .max(11, { message: 'CNH maior que o tamanho permitido' })
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
