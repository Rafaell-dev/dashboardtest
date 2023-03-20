import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useGetUserQuery } from 'state/api'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const AutocompleteUsers = ({ onSelect, value, setFieldValue }) => {
  const { data, isLoading } = useGetUserQuery()

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
          setOptions('Nenhum Usuários disponível')
          console.log('Nenhum Usuários disponível')
        } else {
          const filteredUsers = data.filter(
            driver => driver.reservedVehicle === false
          )
          setOptions([...filteredUsers])
          console.log(filteredUsers)
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

  const handleSelect = (event, valueUser) => {
    if (onSelect) {
      onSelect(valueUser._id) // Chama a função "onSelect" com o valor selecionado
      console.log('Handle Driver: ' + valueUser._id)
      setFieldValue(`driverID`, valueUser._id)
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

export default AutocompleteUsers
