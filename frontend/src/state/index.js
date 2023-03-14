import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'dark',
  userId: '63701cc1f03239b7f700000e'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    }
  }
})

// export const MotoristaSlice = createSlice({
//   name: 'motorista',
//   initialState,
//   reducers: {
//     addMotorista: (state, action) => {
//       const newData = { ...action.payload }
//       state.motorista = [newData, ...state.motorista]
//     }
//   }
// })

export const { setMode } = globalSlice.actions
// export const { addMotorista } = MotoristaSlice.actions

export default globalSlice.reducer
