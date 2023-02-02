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
import { useForm } from 'react-hook-form'
import { color } from '@mui/system'

const Motorista = () => {
  const date = new Date().getFullYear().toString()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const theme = useTheme()

  const [valueDay, setValueDay] = React.useState(dayjs('14/12/2003'))

  const checkCep = e => {
    const cep = e.target.value.replace(/\D/g, '')
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setValue('city', data.localidade)
        setValue('state', data.uf)
        setValue('address', data.bairro)
        setValue('street', data.logradouro)
        setFocus('number')
      })
  }
  const { register, handleSubmit, setValue, setFocus } = useForm()
  const style = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'green'
      }
    }
  }
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Motorista" subtitle="Cadastre um Motorista" />

      <Box
        mt="2rem"
        display="grid"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="1.5rem"
        columnGap="4%"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
        component="form"
      >
        <TextField
          autoComplete="disabled"
          id="filled-read-name-input"
          label="Nome"
          defaultValue=""
          variant="filled"
        />
        <TextField
          autoComplete="disabled"
          id="filled-read-cnh-input"
          label="Registro CNH"
          defaultValue=""
          variant="filled"
        />
        <TextField
          autoComplete="disabled"
          id="cep"
          label="CEP"
          defaultValue=""
          variant="filled"
          onBlur={checkCep}
        />
        <TextField
          autoComplete="disabled"
          id="numero"
          label="Número"
          defaultValue=" "
          variant="filled"
          {...register('number')}
        />
        <TextField
          autoComplete="disabled"
          id="logradouro"
          label="Endereço"
          defaultValue=" "
          variant="filled"
          {...register('address')}
        />
        <TextField
          autoComplete="disabled"
          id="cidade"
          label="Cidade"
          defaultValue=" "
          variant="filled"
          {...register('city')}
        />
        <TextField
          autoComplete="disabled"
          id="estado"
          label="Estado"
          defaultValue=" "
          variant="filled"
          {...register('state')}
        />
        <TextField
          autoComplete="disabled"
          id="rua"
          label="Rua"
          defaultValue=" "
          variant="filled"
          {...register('street')}
        />
        <TextField
          autoComplete="disabled"
          id="filled-read-phoneNumber-input"
          label="Celular"
          defaultValue=""
          variant="filled"
          sx={style}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            views={['day', 'month', 'year']}
            type="date"
            label="Data de Nascimento"
            maxDate={date}
            value={valueDay}
            onChange={newValue => {
              setValueDay(newValue)
            }}
            renderInput={params => <TextField {...params} error={false} />}
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

export default Motorista
