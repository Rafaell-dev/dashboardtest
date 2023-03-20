import { Badge, CheckCircle, Garage, Schedule } from '@mui/icons-material'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import StatBox from 'components/StatBox'
import React from 'react'
import RetiradaDataGrid from 'scenes/dataGrid/retiradas'
import AbastecimentoDataGrid from 'scenes/dataGrid/abastecimentos'
import { useGetUserQuery } from 'state/api'

const Dashboard = () => {
  const { data: motoristaData, isLoading: motoristaDataLoading } =
    useGetUserQuery()
  
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1000px)')
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dashboard" subtitle="Controle sua frota" />       
      {/* ROW 1 */}
      <Box
        mt="3rem"
        display="grid"
        gridTemplateColumns="repeat(1, 1fr)"
        gridAutoRows="30rem"
        gap="1rem"
        height="50vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none'
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`
          }
        }}
      >
        <RetiradaDataGrid />
        <AbastecimentoDataGrid />
      </Box>
    </Box>
  )
}

export default Dashboard
