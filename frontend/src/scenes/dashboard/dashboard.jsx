import { Badge, CheckCircle, Garage, Schedule } from '@mui/icons-material'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import StatBox from 'components/StatBox'
import React from 'react'
import RetiradaDataGrid from 'scenes/dataGrid/retiradas'

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1000px)')
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dashboard" subtitle="Controle sua frota" />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="10rem"
        gap="1rem"
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 4' }
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total de Veículos"
          icon={
            <Garage
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title="Total de Motoristas"
          icon={
            <Badge
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title="Retiradas Abertas"
          icon={
            <Schedule
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title="Veículos disponíveis"
          icon={
            <CheckCircle
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
      </Box>
      {/* ROW 2 */}
      <Box
        mt="3rem"
        display="grid"
        gridTemplateColumns="repeat(1, 1fr)"
        gridAutoRows="30rem"
        gap="1rem"
        height="75vh"
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
      </Box>
    </Box>
  )
}

export default Dashboard
