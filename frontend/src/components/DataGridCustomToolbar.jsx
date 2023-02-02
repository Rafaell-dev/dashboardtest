import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment, useMediaQuery } from '@mui/material'
import Alert from '@mui/material/Alert'
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton
} from '@mui/x-data-grid'
import FlexBetween from 'components/Flexbetween'


const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  
  return (
   
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport
            csv={{ fileName: 'Planilha Genius' }}
            printOptions={{
              hideFooter: true,
              hideToolbar: true
            }}
          />
        </FlexBetween>
        <TextField
          label="Filtrar..."
          sx={{ mb: '0.5rem', width: '15rem' }}
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput)
                    setSearchInput('')
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar
