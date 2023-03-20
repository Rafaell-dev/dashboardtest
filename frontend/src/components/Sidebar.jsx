import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material'
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  DirectionsCar,
  Groups2Outlined,
  Badge
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './Flexbetween'
import profileImage from 'assets/profile.png'
import logoGenius from 'assets/logo_genius.svg'
import BasicModal from './ModalConfig'
import { useSelector } from 'react-redux'

const navItem = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
    permission: ['superadmin']
  },
  {
    text: 'Registros',
    icon: null,
    permission: ['superadmin']
  },
  {
    text: 'Veículos',
    icon: <DirectionsCar />,
    permission: ['superadmin']
  },
  {
    text: 'Usuários',
    icon: <Groups2Outlined />,
    permission: ['superadmin']
  },
  {
    text: 'Cadastrar',
    icon: null,
    permission: ['superadmin', 'user']
  },
  {
    text: 'Abastecimento',
    icon: <PointOfSaleOutlined />,
    permission: ['superadmin', 'user']
  },
  {
    text: 'Retirada',
    icon: <TodayOutlined />,
    permission: ['superadmin', 'user']
  },
  {
    text: 'Veículo',
    icon: <DirectionsCar />,
    permission: ['superadmin']
  },
  {
    text: 'Usuário',
    icon: <Badge />,
    permission: ['superadmin']
  }
]

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile
}) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()
  const role = useSelector(state => state.persistedReducer.user?.role ?? 'guest')
  console.log(role)

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Box component="nav">
      <BasicModal open={openModal} onClose={handleCloseModal} />
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth
            }
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    sx={{ height: 32 }}
                    component="img"
                    alt="Genius"
                    src={logoGenius}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItem.map(({ text, icon, permission }) => {
                if (permission && !permission.includes(role)) {
                  return null
                }
                if (!icon) {
                  return (
                    <Typography
                      fontWeight="bold"
                      key={text}
                      sx={{ m: '2.25rem 0 1rem 3rem' }}
                    >
                      {text}
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase()

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`)
                        setActive(lcText)
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100]
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100]
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 0rem 2rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: 'contain' }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.role}
                </Typography>
              </Box>
              <IconButton onClick={handleOpenModal}>
                <SettingsOutlined sx={{ fontSize: '25px' }} />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
