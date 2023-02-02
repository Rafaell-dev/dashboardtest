import React from 'react'

import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Autocomplete,
  CircularProgress
} from '@mui/material'
import Header from 'components/HeaderV2'
import { Save } from '@mui/icons-material'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Veiculo = () => {
  const date = new Date().getFullYear().toString()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const [value, setValue] = React.useState(dayjs('2023'))

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Veículo" subtitle="Cadastre um veículo" />

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
          id="filled-read-plate-input"
          label="Descrição"
          defaultValue=""
          variant="filled"
          required
        />
        <TextField
          id="filled-read-plate-input"
          label="Placa"
          defaultValue=""
          variant="filled"
        />
        <TextField
          id="filled-read-brand-input"
          label="Marca"
          defaultValue=""
          variant="filled"
        />
        <TextField
          id="filled-read-model-input"
          label="Modelo"
          defaultValue=""
          variant="filled"
        />
        <TextField
          id="filled-read-color-input"
          label="Cor"
          defaultValue=""
          variant="filled"
        />
        <TextField
          id="filled-read-chassi-input"
          label="Chassi"
          defaultValue=""
          variant="filled"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="year"
            views={['year']}
            label="Ano"
            minDate={'1980'}
            maxDate={date}
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} helperText={null} />}
          />
        </LocalizationProvider>
        <Autocomplete
          disablePortal
          id="autocomplete-fuel"
          options={['Gasolina', 'Diesel', 'Álcool']}
          renderInput={params => <TextField {...params} label="Combustível" />}
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

export default Veiculo
