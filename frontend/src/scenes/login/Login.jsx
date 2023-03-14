import React, { useEffect, useState } from 'react'
import {
  Box,
  useTheme,
  TextField,
  Button,
  CssBaseline,
  Container
} from '@mui/material'
import FlexBetween from 'components/Flexbetween'
import logoGenius from '../../assets/logo_genius.svg'

const Login = () => {
  const theme = useTheme()
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }
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
          />
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
