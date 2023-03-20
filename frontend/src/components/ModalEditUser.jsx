import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { usePutUserAuthMutation } from 'state/api'
import { setLogout } from 'state'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { updateUserSchema } from 'schemas'

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

export default function BasicModal(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { open, onClose } = props
  const [updateUser, { isLoading, isError }] = usePutUserAuthMutation()

  const [error, setError] = useState(null)

  const driver = useSelector(state => state.persistedReducer.user)
  const onSubmit = async actions => {
    const userValues = {
      _id: driver._id,
      password: values.password
    }
    try {
      const { data } = await updateUser(userValues)
      console.log('click')
      if (data) {
        dispatch(setLogout())
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data.msg)
    }
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: updateUserSchema,
    onSubmit
  })

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
            Altere sua senha
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{
                shrink: true
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Salvar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
