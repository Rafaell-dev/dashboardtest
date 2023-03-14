import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  IconButton,
  Modal,
  Button,
  useMediaQuery,
  TextField,
  Autocomplete,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  useDeleteVeiculoMutation,
  useGetVeiculoQuery,
  usePutVeiculoMutation
} from 'state/api'
import Header from 'components/HeaderV2'
import { format, parseISO } from 'date-fns'
import { useFormik } from 'formik'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { veiculoSchema } from 'schemas'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const CardVehicle = ({
  _id,
  plate,
  brand,
  model,
  vehicle,
  fuel,
  year,
  color,
  chassi,
  description,
  sequence
}) => {
  const theme = useTheme()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => setOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = () => setOpenEditModal(true)
  const handleCloseEditModal = () => setOpenEditModal(false)

  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  const { refetch } = useGetVeiculoQuery()

  const handleRefresh = () => {
    refetch()
  }
  const [deleteMotorista, { response }] = useDeleteVeiculoMutation()

  const onSubmitDelete = async (values, actions) => {
    try {
      const response = await deleteMotorista(_id)
      console.log('Veiculo removido id:' + _id)
      handleCloseDeleteModal()
      handleRefresh()
    } catch (error) {
      console.log('Ocorreu um erro:' + error)
    }
  }

  const [updateVeiculo, { data, isLoading, isSuccess, isError, error }] =
    usePutVeiculoMutation()

  const onSubmit = async (values, actions) => {
    try {
      const veiculoValues = {
        _id: _id,
        description: values.description,
        plate: values.plate,
        brand: values.brand,
        model: values.model,
        color: values.color,
        chassi: values.chassi,
        vehicle: values.vehicle,
        fuel: values.fuel,
        year: values.year
      }
      const response = await updateVeiculo(veiculoValues)
      console.log(_id)
      console.log('Dados enviados com sucesso:', response)
      handleRefresh()
      console.log(values)
    } catch (error) {
      console.log(_id)
      console.log('Erro ao enviar dados:', error)
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
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: _id,
      description: description,
      plate: plate,
      brand: brand,
      model: model,
      color: color,
      chassi: chassi,
      vehicle: vehicle,
      fuel: fuel,
      year: year ? format(parseISO(year), 'yyyy') : null
    },
    validation: veiculoSchema,
    onSubmit
  })

  let AlertFeedback
  if (isLoading) {
    AlertFeedback = <Alert severity="warning">Carregando...</Alert>
  } else if (isSuccess) {
    AlertFeedback = (
      <Alert severity="success">Veículo reservado com sucesso!</Alert>
    )
  } else if (isError) {
    AlertFeedback = (
      <Alert severity="error">Não foi possível salvar os dados!</Alert>
    )
  }

  return (
    <Card
      id={_id}
      sx={{
        background: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem'
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' }}
          color={theme.palette.secondary[100]}
          gutterBottom
        >
          {vehicle}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[300]}
          gutterBottom
        >
          {brand} | {model}
        </Typography>
        <Typography variant="body2">{plate}</Typography>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          textTransform: 'none',
          mr: '1rem'
        }}
      >
        <IconButton onClick={handleOpenDeleteModal}>
          <DeleteIcon
            sx={{ fontSize: '25px', color: theme.palette.secondary }}
          />
        </IconButton>
        <IconButton onClick={handleOpenEditModal}>
          <EditIcon sx={{ fontSize: '25px', color: theme.palette.secondary }} />
        </IconButton>
      </Box>

      {/* Delete modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id={_id}
      >
        <Box sx={styleModal} key={_id}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja deletar esse registro?
          </Typography>
          <CardContent m="2rem" id="modal-modal-description" sx={{ my: 2 }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
              color={theme.palette.secondary[200]}
              gutterBottom
            >
              {vehicle}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary[300]}
              gutterBottom
            >
              {brand} | {model}
            </Typography>
            <Typography variant="body2">{plate}</Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textTransform: 'none',
              gap: '1rem'
            }}
          >
            <Button variant="contained" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>
            <Button
              variant="Outlined"
              onClick={() => {
                console.log(onSubmitDelete(_id))
              }}
            >
              Deletar
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Edit Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id={_id}
      >
        <Box sx={styleModal} key={_id}>
          <Header title="Veículo" subtitle="Altere um veículo" />
          <form onSubmit={handleSubmit}>
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
                id="description"
                label="Descrição"
                variant="filled"
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
                id="plate"
                label="Placa"
                variant="filled"
                value={values.plate}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.plate && touched.plate && `${errors.plate}`}
              />
              <TextField
                id="brand"
                label="Marca"
                variant="filled"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.brand && touched.brand && `${errors.brand}`}
              />
              <TextField
                id="model"
                label="Modelo"
                variant="filled"
                value={values.model}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.model && touched.model && `${errors.model}`}
              />
              <TextField
                id="color"
                label="Cor"
                variant="filled"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.color && touched.color && `${errors.color}`}
              />
              <TextField
                id="chassi"
                label="Chassi"
                variant="filled"
                value={values.chassi}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.chassi && touched.chassi && `${errors.chassi}`
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="year"
                  openTo="year"
                  views={['year']}
                  label="Ano"
                  value={values.year}
                  inputValue={
                    values.year ? dayjs(values.year).format('YYYY') : ''
                  }
                  onChange={date => {
                    setFieldValue('year', date)
                  }}
                  renderInput={params => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>

              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option.toLowerCase().replace(/\s/g, '') ===
                  value.toLowerCase().replace(/\s/g, '')
                }
                disablePortal
                id="fuel"
                value={values.fuel}
                onChange={handleChange}
                onBlur={handleBlur}
                options={['Gasolina', 'Diesel', 'Álcool']}
                renderInput={params => (
                  <TextField {...params} label="Combustível" />
                )}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                mt: '2rem'
              }}
            >
              <Button variant="contained" onClick={handleCloseEditModal}>
                Cancelar
              </Button>
              {/* <Button variant="primary" type="submit" disabled={!isValid}>
                Salvar
              </Button> */}
              <Button
                sx={{
                  backgroundColor: theme.palette.background.alt
                }}
                size="large"
                variant="primary"
                type="submit"
                disabled={!isValid}
              >
                Salvar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Card>
  )
}

export default CardVehicle
