import { Box, Grid, Typography} from '@mui/material'
import React from 'react'
import brokenRobot from '../assets/broken_page_robot.svg'

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Grid
          width={1}
          height={1}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        >
          <Box
            height="18rem"
            component="img"
            src={brokenRobot}
          />

          <Typography variant="h2" fontWeight="bold" mb="1.5rem">
            OOPS! Algo não ocorreu como esperado.
          </Typography>
          <Typography variant="h5">
            Recarregue a página, caso o erro persista entre em contato com suporte!
          </Typography>
        </Grid>
      )
    }

    return this.props.children
  }
}
export default ErrorBoundary
