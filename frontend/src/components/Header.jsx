import { Typography, Box, useTheme } from '@mui/material'
import React from 'react'
import { useGetUserQuery } from 'state/api'

const Header = ({ title, subtitle }) => {
  const theme = useTheme()
  const { data, isLoading } = useGetUserQuery()
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: '5px' }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[200]}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Header
