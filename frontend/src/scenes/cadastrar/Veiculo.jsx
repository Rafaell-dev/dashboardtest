import React from 'react'
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Alert,
  Autocomplete
} from '@mui/material'
import Header from 'components/HeaderV2'
import { Save } from '@mui/icons-material'
import { usePostVeiculoMutation } from 'state/api'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css'
import { veiculoSchema } from 'schemas'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const Motorista = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const [createVeiculo, { isLoading, isSuccess, isError, error }] =
    usePostVeiculoMutation({ refetchOnMountOrArgChange: true })

  const onSubmit = async (values, actions) => {
    console.log(veiculoValues)
    createVeiculo(veiculoValues)
    console.log('submitted!')
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (!isSuccess) {
      resetForm()
    }
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues: {
      description: '',
      plate: '',
      brand: '',
      model: '',
      color: '',
      chassi: '',
      vehicle: '',
      fuel: '',
      year: '',
      sequence: ''
    },
    validationSchema: veiculoSchema,
    onSubmit
  })
  const veiculoValues = {
    description: values.description,
    plate: values.plate,
    brand: values.brand,
    model: values.model,
    color: values.color,
    chassi: values.chassi,
    vehicle: values.vehicle,
    fuel: values.fuel,
    year: values.year,
    sequence: values.sequence
  }

  let AlertFeedback
  if (isLoading) {
    AlertFeedback = <Alert severity="warning">Carregando...</Alert>
  } else if (isSuccess) {
    AlertFeedback = (
      <Alert severity="success">Dados enviados com sucesso!</Alert>
    )
  } else if (isError) {
    AlertFeedback = (
      <Alert severity="error">Não foi possível salvar os dados!</Alert>
    )
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Veículo" subtitle="Cadastre um Veículo" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box my="1rem">{AlertFeedback}</Box>
        <Box
          mt="2rem"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="1.5rem"
          columnGap="4%"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },

            '& label.Mui-focused': {
              color: theme.palette.secondary[200]
            },
            '& .MuiFormHelperText-root': {
              color: '#D9002B',
              fontWeight: 'bold'
            }
          }}
        >
          <TextField
            autoComplete="disabled"
            id="description"
            label="Descrição"
            variant="filled"
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.description &&
              touched.description &&
              `${errors.description}`
            }
          />
          <TextField
            autoComplete="disabled"
            id="plate"
            label="Placa"
            variant="filled"
            type="text"
            name="plate"
            value={values.plate}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.plate && touched.plate && `${errors.plate}`}
          />

          <TextField
            autoComplete="disabled"
            id="sequence"
            label="Sequência"
            variant="filled"
            value={values.sequence}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.sequence && touched.sequence && `${errors.sequence}`
            }
          />
          <TextField
            autoComplete="disabled"
            id="brand"
            label="Marca"
            variant="filled"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.brand && touched.brand && `${errors.brand}`}
          />
          <TextField
            autoComplete="disabled"
            id="model"
            label="Modelo"
            variant="filled"
            value={values.model}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.model && touched.model && `${errors.model}`}
          />
          <TextField
            autoComplete="disabled"
            id="color"
            label="Cor"
            variant="filled"
            value={values.color}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.color && touched.color && `${errors.color}`}
          />
          <TextField
            autoComplete="disabled"
            id="chassi"
            label="Chassi"
            variant="filled"
            value={values.chassi}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.chassi && touched.chassi && `${errors.chassi}`}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              id="year"
              openTo="year"
              views={['year']}
              label="Ano"
              value={values.year || null}
              inputValue={values.year ? dayjs(values.year).format('YYYY') : ''}
              onChange={date => {
                setFieldValue('year', date)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={errors.year && touched.year && `${errors.year}`}
                />
              )}
            />
          </LocalizationProvider>
          <Autocomplete
            disablePortal
            id="vehicle"
            value={values.vehicle}
            onChange={(event, newValue) => {
              setFieldValue('vehicle', newValue)
            }}
            options={['', 'Carro', 'Caminhão', 'Moto']}
            renderInput={params => (
              <TextField
                {...params}
                label="Veículo"
                error={touched.vehicle && Boolean(errors.vehicle)}
                helperText={touched.vehicle && errors.vehicle}
              />
            )}
          />
          <Autocomplete
            disablePortal
            id="vehicle"
            value={values.fuel}
            onChange={(event, newValue) => {
              setFieldValue('fuel', newValue)
            }}
            options={['', 'Gasolina', 'Diesel', 'Álcool']}
            renderInput={params => (
              <TextField
                {...params}
                label="Combustível"
                error={touched.fuel && Boolean(errors.fuel)}
                helperText={touched.fuel && errors.fuel}
              />
            )}
          />
        </Box>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(0, minmax(1, 1fr))"
          justifyContent="center"
        >
          <Button
            sx={{
              paddingX: 10,
              fontSize: 14,
              fontWeight: 'bold',
              mt: 4,
              backgroundColor: theme.palette.background.alt
            }}
            size="large"
            variant="primary"
            endIcon={<Save />}
            type="submit"
            disabled={!isValid}
          >
            Salvar
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Motorista
