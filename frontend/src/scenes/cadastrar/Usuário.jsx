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
import { usePostUserMutation } from 'state/api'
import { useFormik } from 'formik'
import { userSchema } from 'schemas'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

const User = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const [createUser, { isLoading, isSuccess, isError, error }] =
    usePostUserMutation({ refetchOnMountOrArgChange: true })

  const onSubmit = async (values, actions) => {
    try {
      const userValues = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        cnh: values.cnh,
        city: values.city,
        state: values.state,
        phoneNumber: values.phoneNumber
      }
      console.log(values)
      createUser(userValues)
      console.log('submitted!')
      await new Promise(resolve => setTimeout(resolve, 1000))
      resetForm()
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
      name: '',
      email: '',
      password: 'User@@2023',
      role: '',
      cnh: '',
      city: '',
      state: '',
      phoneNumber: ''
    },
    validationSchema: userSchema,
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
      <Header title="Usuários" subtitle="Cadastre um Usuário" />
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
            id="name"
            label="Nome"
            variant="filled"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.name && touched.name && `${errors.name}`}
          />

          <TextField
            autoComplete="disabled"
            id="cnh"
            label="Registro CNH"
            variant="filled"
            name="cnh"
            value={values.cnh}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.cnh && touched.cnh && `${errors.cnh}`}
          />
          <TextField
            disabled
            autoComplete="disabled"
            id="password"
            label="Senha"
            variant="filled"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.password && touched.password && `${errors.password}`
            }
          />
          <TextField
            autoComplete="disabled"
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
            id="city"
            label="Cidade"
            variant="filled"
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.city && touched.city && `${errors.city}`}
          />
          <TextField
            autoComplete="disabled"
            id="state"
            label="Estado"
            variant="filled"
            value={values.state}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.state && touched.state && `${errors.state}`}
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
          <Autocomplete
            disablePortal
            id="role"
            value={values.role}
            onChange={(event, newValue) => {
              setFieldValue('role', newValue)
            }}
            options={['', 'user', 'superadmin']}
            renderInput={params => (
              <TextField
                {...params}
                label="Cargo"
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
              />
            )}
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
                    errors.birthday && touched.birthday && `${errors.birthday}`
                  }
                />
              )}
            />
          </LocalizationProvider>
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

export default User
