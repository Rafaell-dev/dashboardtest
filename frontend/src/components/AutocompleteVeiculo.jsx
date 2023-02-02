import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useGetVeiculoQuery } from 'state/api'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const AutocompleteVeiculos = () => {
  const { data, isLoading } = useGetVeiculoQuery()

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
        setOptions([...data])
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
  return (
    <Autocomplete
      id="asynchronous-auto"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={option => option.brand + ' - ' + option.plate}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Veículo"
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

export default AutocompleteVeiculos
