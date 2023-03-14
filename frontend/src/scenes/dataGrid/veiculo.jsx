import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { useGetVeiculoSearchQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const Veiculos = () => {
  const theme = useTheme()

  //Values to be send to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [searchInput, setSearchInput] = useState('')
  const { data, isLoading } = useGetVeiculoSearchQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })
  console.log('data', data)
  const columns = [
    {
      field: 'vehicle',
      headerName: 'Veículo',
      flex: 0.5
    },
    {
      field: 'plate',
      headerName: 'Placa',
      flex: 0.5
    },
    {
      field: 'brand',
      headerName: 'Marca',
      flex: 0.5
    },
    {
      field: 'model',
      headerName: 'Modelo',
      flex: 0.5
    },
    {
      field: 'color',
      headerName: 'Color',
      flex: 0.5
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5
    },
    {
      field: 'chassi',
      headerName: 'Chassi',
      flex: 0.5
    },
    {
      field: 'fuel',
      headerName: 'Combustivel',
      flex: 0.5
    },
    {
      field: 'year',
      headerName: 'Ano',
      flex: 1
    }
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Veículos" subtitle="Registro de Veículos" />
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
          rows={(data && data.veiculosSearch) || []}
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

export default Veiculos
