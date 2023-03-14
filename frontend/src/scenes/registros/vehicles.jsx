import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import { useGetVeiculoQuery } from 'state/api'
import CardVehicle from 'components/CardVehicle.jsx'

const Veiculos = () => {
  const { data, isLoading } = useGetVeiculoQuery()
  const isNonMobile = useMediaQuery('(min-width: 800px)')

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Veiculos" subtitle="Altere ou exclua algum veículo" />
      {data || !isLoading ? (
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
          {data.map(
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
