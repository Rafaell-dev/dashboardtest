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
  useDeleteMotoristaMutation,
  useGetMotoristaQuery,
  usePutMotoristaMutation
} from 'state/api'
import Header from 'components/HeaderV2'
import { format, parseISO } from 'date-fns'
import { useFormik } from 'formik'
import { motoristaSchema } from 'schemas'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect } from 'react'
import dayjs from 'dayjs'

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
  name,
  email,
  cnh,
  city,
  state,
  country,
  phoneNumber,
  birthday,
  role
}) => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => setOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = () => setOpenEditModal(true)
  const handleCloseEditModal = () => setOpenEditModal(false)

  const { refetch } = useGetMotoristaQuery()
  const handleRefresh = () => {
    refetch()
  }

  const [deleteMotorista, { response }] = useDeleteMotoristaMutation()

  const onSubmitDelete = async (values, actions) => {
    try {
      const response = await deleteMotorista(_id)
      handleCloseDeleteModal()
      handleRefresh()
      console.log('Motorista removido id:' + _id)
    } catch (error) {
      console.log('Ocorreu um erro:' + error)
    }
  }

  const [updateMotorista, { isLoading, isSuccess, isError, error }] =
    usePutMotoristaMutation({ tchOnMountOrArgChange: true })

  const onSubmit = async (values, actions) => {
    try {
      const motoristaValues = {
        _id: values._id,
        name: values.name,
        email: values.email,
        cnh: values.cnh,
        city: values.city,
        state: values.state,
        country: values.country,
        phoneNumber: values.phoneNumber,
        birthday: values.birthday,
        role: values.role
      }
      const response = await updateMotorista(motoristaValues)
      console.log(_id)
      console.log('Dados enviados com sucesso:', response)
      handleRefresh()
    } catch (error) {
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
      name: name,
      email: email,
      cnh: cnh,
      city: city,
      state: state,
      country: country,
      phoneNumber: phoneNumber,
      birthday: birthday ? format(parseISO(birthday), 'yyyy-MM-dd') : null,
      role: role
    },
    validationSchema: motoristaSchema,
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
          {name}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[300]}
          gutterBottom
        >
          {phoneNumber}
        </Typography>
        <Typography variant="body2">{cnh}</Typography>
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
              {name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary[300]}
              gutterBottom
            >
              {email} | {phoneNumber}
            </Typography>
            <Typography variant="body2">{cnh}</Typography>
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
          <Header title="Motorista" subtitle="Altere um registro" />
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
                id="name"
                label="Nome"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.name && touched.name && `${errors.name}`}
              />
              <TextField
                id="email"
                label="Email"
                variant="filled"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.email && touched.email && `${errors.email}`}
              />
              <TextField
                autoComplete="disabled"
                id="phoneNumber"
                label="Celular"
                variant="filled"
                value={values.phoneNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors.phoneNumber &&
                  touched.phoneNumber &&
                  `${errors.phoneNumber}`
                }
              />
              <TextField
                id="cnh"
                label="CNH"
                variant="filled"
                value={values.cnh}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.cnh && touched.cnh && `${errors.cnh}`}
              />
              <TextField
                id="city"
                label="Cidade"
                variant="filled"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.city && touched.city && `${errors.city}`}
              />
              <TextField
                id="state"
                label="Estado"
                variant="filled"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.state && touched.state && `${errors.state}`}
              />
              <TextField
                id="country"
                label="País"
                variant="filled"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.country && touched.country && `${errors.country}`
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  id="birthday"
                  label="Data de Nascimento"
                  value={values.birthday || null}
                  onChange={date => {
                    setFieldValue('birthday', date)
                  }}
                  format="DD/MM/YYYY"
                  inputFormat="DD/MM/YYYY"
                  renderInput={params => (
                    <TextField
                      {...params}
                      helperText={
                        errors.birthday &&
                        touched.birthday &&
                        `${errors.birthday}`
                      }
                    />
                  )}
                />
              </LocalizationProvider>
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option.toLowerCase().replace(/\s/g, '') ===
                  value.toLowerCase().replace(/\s/g, '')
                }
                disablePortal
                id="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                options={['user', 'admin', 'superadmin']}
                renderInput={params => <TextField {...params} label="Cargo" />}
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
