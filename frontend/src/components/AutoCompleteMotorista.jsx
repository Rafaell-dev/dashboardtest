import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useGetMotoristaQuery } from 'state/api'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const AutocompleteMotoristas = ({ onSelect, value, setFieldValue }) => {
  const { data, isLoading } = useGetMotoristaQuery()

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      await sleep(1e3) // For demo purposes.

      if (active) {
        if (data.length === 0) {
          setOptions('Nenhum Motorista disponível')
          console.log('Nenhum Motorista disponível')
        } else {
          const filteredDrivers = data.filter(
            driver => driver.reservedVehicle === false
          )
          setOptions([...filteredDrivers])
          console.log(filteredDrivers)
        }
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const handleSelect = (event, valueDriver) => {
    if (onSelect) {
      onSelect(valueDriver._id) // Chama a função "onSelect" com o valor selecionado
      console.log('Handle Driver: ' + valueDriver._id)
      setFieldValue(`driverID`, valueDriver._id)
    }
  }

  return (
    <Autocomplete
      id="driverID"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={option => option.name + ' - ' + option.cnh}
      onChange={handleSelect}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Motorista"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default AutocompleteMotoristas
