import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Autocomplete,
  Alert
} from '@mui/material'
import Header from 'components/HeaderV2'
import { Save } from '@mui/icons-material'
import AutocompleteVeiculos from 'components/AutoVeiculosNonFiltered'
import {
  useGetAbastecimentoQuery,
  usePostAbastecimentoMutation
} from 'state/api'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { abastecimentoSchema } from 'schemas/index.js'

const Abastecimento = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const handleSelectVehicle = vehicle => {
    console.log('Handle vehicle', vehicle)
    setSelectedVehicle(vehicle)
    setFieldValue('vehicleID', vehicle)
  }
  useEffect(() => {
    console.log(selectedVehicle)
  }, [selectedVehicle])

  const [
    createAbastecimento,
    { isLoading, isSuccess, isError, error: errorAbastecimento }
  ] = usePostAbastecimentoMutation({
    refetchOnMountOrArgChange: true
  })
  const driver = useSelector(state => state.persistedReducer.user)

  const { refetch: abastecimentoRefetch } = useGetAbastecimentoQuery()
  const handleRefresh = () => {
    abastecimentoRefetch()
  }

  const onSubmit = async actions => {
    try {
      const RetiradaValues = {
        driverID: driver._id,
        fuel: values.fuel,
        precoLitro: values.precoLitro,
        vehicleID: values.vehicleID,
        kmAtual: values.kmAtual,
        litros: values.litros,
        data: values.dataAbastecimento
      }
      console.log(RetiradaValues)
      await createAbastecimento(RetiradaValues)
      await new Promise(resolve => setTimeout(resolve, 1000))
      resetForm()
      handleRefresh()
    } catch {
      console.log('Não foi possivel salvar os dados')
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
    setFieldValue,
    setFieldError
  } = useFormik({
    initialValues: {
      precoLitro: '',
      vehicleID: '',
      kmAtual: '',
      litros: '',
      dataAbastecimento: null,
      driverID: driver._id
    },
    validationSchema: abastecimentoSchema,
    onSubmit
  })

  let AlertFeedback
  if (isLoading) {
    AlertFeedback = <Alert severity="warning">Carregando...</Alert>
  } else if (isSuccess) {
    AlertFeedback = (
      <Alert severity="success">Dados enviados com sucesso!</Alert>
    )
  } else if (isError) {
    AlertFeedback = (
      <Alert severity="error">
        Não foi possível salvar os dados!
        <br /> {errorAbastecimento?.data?.error}
      </Alert>
    )
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Abastecimentos" subtitle="Registre um abastecimento" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box my="1rem">{AlertFeedback}</Box>
        <Box
          mt="2rem"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="1.5rem"
          columnGap="4%"
          sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disableFuture
              id="dataAbastecimento"
              label="Data de Abastecimento"
              value={values.dataAbastecimento || null}
              onChange={date => {
                setFieldValue('dataAbastecimento', date)
              }}
              format="dd/MM/yyyy HH:mm"
              inputFormat="DD/MM/YYYY HH:mm"
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={
                    errors.dataAbastecimento &&
                    touched.dataAbastecimento &&
                    `${errors.dataAbastecimento}`
                  }
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            id="precoLitro"
            label="Preço por Litro"
            variant="filled"
            value={values.precoLitro}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.precoLitro && touched.precoLitro && `${errors.precoLitro}`
            }
          />
          <TextField
            id="kmAtual"
            label="Km Atual"
            variant="filled"
            value={values.kmAtual}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.kmAtual && touched.kmAtual && `${errors.kmAtual}`
            }
          />

          <TextField
            id="litros"
            label="Litros"
            variant="filled"
            value={values.litros}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.litros && touched.litros && `${errors.litros}`}
          />
          <AutocompleteVeiculos
            onSelect={handleSelectVehicle}
            value={values.vehicleID}
            setFieldValue={setFieldValue}
            error={touched.vehicleID && Boolean(errors.vehicleID)}
            helperText={touched.vehicleID && errors.vehicleID}
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

export default Abastecimento
