import React, { useState } from 'react'
import { Box, Button, TextField, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import { useGetVeiculoQuery } from 'state/api'
import CardVehicle from 'components/CardVehicle.jsx'

const Veiculos = () => {
  const { data, isLoading } = useGetVeiculoQuery()
  const isNonMobile = useMediaQuery('(min-width: 800px)')

  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = data
    ? data.filter(
        ({ description, plate, brand }) =>
          brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleSearch = () => {
    // handle search logic
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Veiculos" subtitle="Altere ou exclua algum veículo" />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          my: '1.5rem'
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          label="Pesquisar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Pesquisar
        </Button>
      </Box>

      {filteredData.length ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
          }}
        >
          {filteredData.map(
            ({
              _id,
              plate,
              brand,
              model,
              color,
              status,
              chassi,
              activeStatus,
              fuel,
              year,
              vehicle,
              description
            }) => (
              <CardVehicle
                key={_id}
                _id={_id}
                plate={plate}
                brand={brand}
                color={color}
                status={status}
                chassi={chassi}
                model={model}
                activeStatus={activeStatus}
                fuel={fuel}
                year={year}
                vehicle={vehicle}
                description={description}
              />
            )
          )}
        </Box>
      ) : (
        <>Carregando...</>
      )}
    </Box>
  )
}

export default Veiculos
