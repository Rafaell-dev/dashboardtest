import React, { useState } from 'react'
import { Box, useMediaQuery, TextField, Button } from '@mui/material'
import Header from 'components/Header'
import { useGetUserQuery } from 'state/api'
import CardDriver from 'components/CardDriver.jsx'

const Users = () => {
  const { data, isLoading } = useGetUserQuery()
  const isNonMobile = useMediaQuery('(min-width: 800px)')

  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = data
    ? data.filter(
        ({ name, email, phoneNumber }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleSearch = () => {
    // handle search logic
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Usuários" subtitle="Altere ou exclua um registro" />

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
              name,
              email,
              cnh,
              city,
              state,
              country,
              phoneNumber,
              birthday,
              role
            }) => (
              <CardDriver
                key={_id}
                _id={_id}
                name={name}
                email={email}
                cnh={cnh}
                city={city}
                state={state}
                country={country}
                phoneNumber={phoneNumber}
                birthday={birthday}
                role={role}
              />
            )
          )}
        </Box>
      ) : isLoading ? (
        'Carregando...'
      ) : (
        'Nenhum resultado encontrado.'
      )}
    </Box>
  )
}

export default Users
