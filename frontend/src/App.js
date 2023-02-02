import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { themeSettings } from 'theme'

import Layout from 'scenes/layout/layout.jsx'
import Dashboard from 'scenes/dashboard/dashboard.jsx'
import Veiculos from 'scenes/veiculos/veiculo'
import Motoristas from 'scenes/motoristas/motorista'
import Abastecimentos from 'scenes/abastecimentos/abastecimentos'
import Retiradas from 'scenes/retiradas/retirada'
import Login from 'scenes/login/Login'
import Motorista from 'scenes/cadastrar/Motorista'
import Veiculo from 'scenes/cadastrar/Veiculo'
import { ptBR } from '@mui/x-data-grid'
import ErrorBoundary from 'components/ErrorBoundary'

function App() {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode), ptBR), [mode])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <ErrorBoundary>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/veículos" element={<Veiculos />} />
                <Route path="/motoristas" element={<Motoristas />} />
                <Route path="/abastecimentos" element={<Abastecimentos />} />
                <Route path="/retiradas" element={<Retiradas />} />
                <Route path="/motorista" element={<Motorista />} />
                <Route path="/veículo" element={<Veiculo />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
