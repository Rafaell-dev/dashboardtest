import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 4
}

const currentYear = new Date().getFullYear()

export default function BasicModal(props) {
  const { open, onClose } = props

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sobre
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="body1"
            component="p"
          >
            Versão: 1.0.0
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body1" component="p">
            &copy; {currentYear} Genius. Todos os direitos reservados.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
