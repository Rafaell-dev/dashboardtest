import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { themeSettings } from 'theme'

import Layout from 'scenes/layout/layout.jsx'
import Dashboard from 'scenes/dashboard/dashboard.jsx'
import Veiculos from 'scenes/registros/vehicles'
import Users from 'scenes/registros/drivers'
import Abastecimentos from 'scenes/abastecimentos/abastecimentos'
import Retiradas from 'scenes/retiradas/retirada'
import Login from 'scenes/login/Login'
import User from 'scenes/cadastrar/Usuário'
import Veiculo from 'scenes/cadastrar/Veiculo'
import { ptBR } from '@mui/x-data-grid'
import ErrorBoundary from 'components/ErrorBoundary'
import ChangePassword from 'components/ChangePassword'

function App() {
  const mode = useSelector(state => state.persistedReducer.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode), ptBR), [mode])
  const isAuth = Boolean(useSelector(state => state.persistedReducer.token))
  const role = useSelector(state => state.persistedReducer.user?.role ?? 'guest')
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={ <Login />}
              />
              <Route
                  path="/changePassword"
                  element={isAuth ? <ChangePassword /> : <Navigate to="/" />}
                />
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={isAuth && role === "superadmin" ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                  path="/veículos"
                  element={isAuth && role === "superadmin" ? <Veiculos /> : <Navigate to="/" />}
                />
                <Route
                  path="/Usuários"
                  element={isAuth && role === "superadmin" ? <Users /> : <Navigate to="/" />}
                />
                <Route
                  path="/abastecimento"
                  element={
                    isAuth && (role === "superadmin" || role === "user") ? <Abastecimentos /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/retirada"
                  element={isAuth && (role === "superadmin" || role === "user") ? <Retiradas /> : <Navigate to="/" />}
                />
                <Route
                  path="/veículo"
                  element={isAuth && role === "superadmin" ? <Veiculo /> : <Navigate to="/" />}
                />
                <Route
                  path="/Usuário"
                  element={isAuth && role === "superadmin" ? <User /> : <Navigate to="/" />}
                />
                
              </Route>
            </Routes>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
