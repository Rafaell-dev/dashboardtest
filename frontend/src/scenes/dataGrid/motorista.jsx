import React, { useState } from 'react'
import {
  Box,
  useTheme,
} from '@mui/material'
import Header from 'components/Header'
import { useGetMotoristaSearchQuery } from 'state/api'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { DataGrid } from '@mui/x-data-grid'

const Motorista = () => {
  const theme = useTheme()

  //Values to be send to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [searchInput, setSearchInput] = useState('')
  const { data, isLoading } = useGetMotoristaSearchQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })
  console.log('data', data)
  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.5
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.5
    },
    {
      field: 'cnh',
      headerName: 'CNH',
      flex: 0.5
    },
    {
      field: 'city',
      headerName: 'Cidade',
      flex: 0.5
    },
    {
      field: 'state',
      headerName: 'Estado',
      flex: 0.5
    },
    {
      field: 'phoneNumber',
      headerName: 'Celular',
      flex: 0.5
    },
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Motoristas" subtitle="Registro de Motoristas" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none'
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`
          }
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={row => row._id}
          rows={(data && data.motoristasSearch) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={newPage => setPage(newPage)}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          onSortModelChange={newSortModel => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
            GridToolbar: {
              printOptions: {
                hideFooter: true,
                hideToolbar: true
              }
            }
          }}
          sx={{
            '@media print': {
              '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' }
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Motorista
