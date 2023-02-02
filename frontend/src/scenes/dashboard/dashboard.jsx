import { Box, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import StatBox from 'components/StatBox';
import React from 'react'

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1000px)");
  // const { data, isLoading } = useGetDashboardQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dashboard" subtitle="Visão geral" />
      
      
    </Box>
  )
}

export default Dashboard
