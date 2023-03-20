import React from 'react'
import {
  Box,
  useTheme,
  TextField,
  Button,
  CssBaseline,
  Container,
  Alert
} from '@mui/material'
import FlexBetween from 'components/Flexbetween'
import logoGenius from '../../assets/logo_genius.svg'
import { useFormik } from 'formik'
import { loginSchema } from 'schemas'
import { setLogin } from 'state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePostLoginMutation } from 'state/api'
import { useState } from 'react'

const Login = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const [login, { isLoading, isError }] = usePostLoginMutation()

  const onSubmit = async values => {
    const userValues = {
      email: values.email,
      password: values.password
    }
    try {
      const { data } = await login(userValues)
      if (data) {
        dispatch(setLogin({ user: data.user, token: data.token }))
        if (data.user.forcePasswordChange) {
          navigate('/changePassword')
        } else if (data.user.role === 'superadmin') {
          navigate('/dashboard')
        } else if (data.user.role === 'user') {
          navigate('/retirada')
        }
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data.msg)
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
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit
  })
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <CssBaseline />
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <FlexBetween color={theme.palette.secondary.main}>
            <Box display="flex" mr={2}>
              <Box
                sx={{ height: 40 }}
                component="img"
                alt="Genius"
                src={logoGenius}
              />
            </Box>
          </FlexBetween>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            InputLabelProps={{
              shrink: true
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{
              shrink: true
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Box>
            {isError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                Ocorreu um erro ao fazer login. Verifique suas credenciais e
                tente novamente.
              </Alert>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
