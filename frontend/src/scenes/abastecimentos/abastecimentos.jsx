import React from 'react'
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Autocomplete,
} from '@mui/material'
import Header from 'components/HeaderV2'
import { Save } from '@mui/icons-material'
import AutocompleteVeiculos from 'components/AutocompleteVeiculo'


const Abastecimento = () => {
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Abastecimentos" subtitle="Registre um abastecimento" />

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
          id="date"
          label="Data"
          type="date"
          defaultValue=""
          InputLabelProps={{
            shrink: true
          }}
        />
        <AutocompleteVeiculos />
        <Autocomplete
          disablePortal
          id="autocomplete-fuel"
          options={['Gasolina', 'Diesel', 'Álcool']}
          renderInput={params => <TextField {...params} label="Combustível" />}
        />
        <TextField
          id="filled-only-custo-input"
          label="Preço por Litro"
          defaultValue=" "
          InputProps={{
            readOnly: true
          }}
          variant="filled"
        />
        <TextField
          id="filled-helperText"
          label="Km Atual"
          defaultValue=""
          helperText="Km do odômetro"
          variant="filled"
        />

        <TextField
          id="filled-helperText"
          label="Litros"
          defaultValue=""
          helperText="Litros abastecidos"
          variant="filled"
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
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}

export default Abastecimento
