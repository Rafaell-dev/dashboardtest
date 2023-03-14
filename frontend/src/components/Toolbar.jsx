import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment, useTheme } from '@mui/material'
import FlexBetween from 'components/Flexbetween'

const Toolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const theme = useTheme()
  return (
    <TextField
      label="Pesquisar..."
      sx={{ my: '0.5rem', width: '15rem' }}
      variant="standard"
      onChange={e => setSearchInput(e.target.value)}
      value={searchInput}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Search
                onClick={() => {
                  setSearch(searchInput)
                  setSearchInput('')
                }}
              />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default Toolbar
