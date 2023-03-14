import React, { useEffect } from 'react'
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Alert,
  Autocomplete,
  CircularProgress
} from '@mui/material'
import Header from 'components/HeaderV2'
import { Save } from '@mui/icons-material'
import AutocompleteVeiculos from 'components/AutocompleteVeiculo'
import AutocompleteMotoristas from 'components/AutoCompleteMotorista'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useField, useFormik } from 'formik'
import {
  usePutVeiculoMutation,
  usePostRetiradaMutation,
  usePutMotoristaMutation,
  useGetRetiradaQuery
} from 'state/api'
import { useState } from 'react'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const Retirada = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const handleSelectVehicle = vehicle => {
    setSelectedVehicle(vehicle)
    setFieldValue('vehicleID', vehicle)
  }

  useEffect(() => {
    console.log(selectedVehicle)
  }, [selectedVehicle])

  const [selectedDriver, setSelectedDriver] = useState(null)

  const handleSelectDriver = driver => {
    setSelectedDriver(driver)
    setFieldValue('driverID', driver)
  }

  useEffect(() => {
    console.log(selectedDriver)
  }, [selectedDriver])

  const [createRetirada, { isLoading, isSuccess, isError, error }] =
    usePostRetiradaMutation({ refetchOnMountOrArgChange: true })

  const [
    updateVehicle,
    {
      isLoading: updateVehicleLoading,
      isError: updateVehicleIsError,
      isSuccess: updateVehicleIsSuccess
    }
  ] = usePutVeiculoMutation({ refetchOnMountOrArgChange: true })

  const [
    updateDriver,
    {
      isLoading: updateDriverLoading,
      isError: updateDriverIsError,
      isSuccess: updateDriverIsSuccess
    }
  ] = usePutMotoristaMutation({ refetchOnMountOrArgChange: true })

  const { refetch: retiradaRefetch } = useGetRetiradaQuery()
  const handleRefresh = () => {
    retiradaRefetch()
  }

  const onSubmit = async (values, actions) => {
    try {
      console.log(values)
      createRetirada(values)
      await updateVehicle({
        _id: values.vehicleID,
        status: 'reservado'
      })
      await updateDriver({
        _id: values.driverID,
        reservedVehicle: true
      })
      await new Promise(resolve => setTimeout(resolve, 1000))
      resetForm()
      handleRefresh()
    } catch {
      console.log('Não foi possivel salvar os dados' + isError)
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
      dataRetirada: null,
      dataRetorno: null,
      driverID: null,
      vehicleID: null
    },
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
      <Alert severity="error">Não foi possível salvar os dados!</Alert>
    )
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Retiradas" subtitle="Registre uma retirada de veículo" />
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
              disablePast
              id="dataRetirada"
              label="Data de Retirada"
              value={values.dataRetirada || null}
              onChange={date => {
                setFieldValue('dataRetirada', date)
              }}
              format="dd/MM/yyyy HH:mm"
              inputFormat="DD/MM/YYYY HH:mm"
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={
                    errors.dataRetirada &&
                    touched.dataRetirada &&
                    `${errors.dataRetirada}`
                  }
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disablePast
              id="dataRetirada"
              label="Data de Devolução"
              value={values.dataRetorno || null}
              onChange={date => {
                setFieldValue('dataRetorno', date)
              }}
              format="dd/MM/yyyy HH:mm"
              inputFormat="DD/MM/YYYY HH:mm"
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={
                    errors.dataRetorno &&
                    touched.dataRetorno &&
                    `${errors.dataRetorno}`
                  }
                />
              )}
            />
          </LocalizationProvider>
          <AutocompleteVeiculos
            onSelect={handleSelectVehicle}
            value={values.vehicleID}
            setFieldValue={setFieldValue}
          />
          <AutocompleteMotoristas
            onSelect={handleSelectDriver}
            value={values.driverID}
            setFieldValue={setFieldValue}
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

export default Retirada
