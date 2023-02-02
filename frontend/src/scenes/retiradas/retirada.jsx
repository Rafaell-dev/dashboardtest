import React from 'react'
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
} from '@mui/material'
import Header from 'components/HeaderV2'
import { Save } from '@mui/icons-material'
import AutocompleteVeiculos from 'components/AutocompleteVeiculo'
import AutocompleteMotoristas from 'components/AutoCompleteMotorista'


const Retirada = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Retiradas" subtitle="Registre uma retirada de veículo" />

      <Box
        mt="2rem"
        display="grid"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="1.5rem"
        columnGap="4%"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
      >
        <TextField
          id="filled-read-only-input"
          label="ID"
          defaultValue="01"
          InputProps={{
            readOnly: true
          }}
          variant="filled"
        />

        <TextField
          id="date"
          label="Data"
          type="date"
          defaultValue=""
          InputLabelProps={{
            shrink: true
          }}
          helperText="Data de retirada"
        />
        <TextField
          id="date"
          label="Data"
          type="date"
          defaultValue=""
          InputLabelProps={{
            shrink: true
          }}
          helperText="Data de devolução"
        />
      <AutocompleteVeiculos />
      <AutocompleteMotoristas />
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
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}

export default Retirada
