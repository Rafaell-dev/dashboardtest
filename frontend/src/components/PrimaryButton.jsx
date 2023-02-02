import { Button, useTheme } from '@mui/material'
import React from 'react'

const PrimaryButton = (props) => {
  const theme = useTheme()
  return (
    <Button
      sx={{
        paddingX: 10,
        fontSize: 14,
        mt: 4,
        backgroundColor: theme.palette.background.alt
      }}
      size="large"
      variant="primary"
      type='submit'
    >
     {props.text}
    </Button>
  )
}

export default PrimaryButton
