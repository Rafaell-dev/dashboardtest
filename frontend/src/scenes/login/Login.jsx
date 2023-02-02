import React, { useEffect, useState } from 'react'
import { Box, useTheme, TextField, useMediaQuery, Grid } from '@mui/material'
import FlexBetween from 'components/Flexbetween'
import logoGenius from '../../assets/logo_genius.svg'
import PrimaryButton from 'components/PrimaryButton'
const Login = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()
  return (
    <Grid
      height={1}
      mt="1.5rem"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
    >
      <Box m="1.5rem 2rem 2rem 3rem">
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
      <Box my={4} item>
        <TextField
          fullWidth
          id="user"
          label="Usuário"
          defaultValue=""
          variant="outlined"
        />
      </Box>
      <Box xs={6} item>
        <TextField
          fullWidth
          id="filled-read-only-input"
          label="Senha"
          defaultValue=""
          variant="outlined"
        />
      </Box>
      <Box>
        <PrimaryButton text="Entrar" />
      </Box>
    </Grid>
  )
}

export default Login
