import { Search } from '@mui/icons-material'

import FlexBetween from 'components/Flexbetween'
import { Box, IconButton, InputBase, useTheme } from '@mui/material'

const InputSearch = () => {
  const theme = useTheme()
  return (
    <Box>
        <FlexBetween>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            
          >
            <InputBase placeholder="Localizar..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
    </Box>
  )
}

export default InputSearch
