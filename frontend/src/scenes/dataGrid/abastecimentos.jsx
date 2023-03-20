import React, { useState } from 'react'
import { Box, Button, useTheme } from '@mui/material'
import Header from 'components/Header'
import {
  useGetAbastecimentoSearchQuery,
  useGetVeiculoQuery,
  useGetUserQuery
} from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { useEffect } from 'react'

const Abastecimentos = () => {
  const theme = useTheme()

  //Values to be send to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [searchInput, setSearchInput] = useState('')
  const {
    data: abastecimentoData,
    isLoading: abastecimentoDataLoading,
    refetch: abastecimentoRefetch
  } = useGetAbastecimentoSearchQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })
  const { data: motoristaData, isLoading: motoristaDataLoading } =
    useGetUserQuery()
  const { data: veiculoData, isLoading: veiculoDataLoading } =
    useGetVeiculoQuery()

  const [motoristas, setMotoristas] = useState({})
  const [veiculos, setVeiculos] = useState({})

  useEffect(() => {
    if (!motoristaDataLoading && motoristaData) {
      const motoristasObj = motoristaData.reduce((acc, motorista) => {
        acc[motorista._id] = motorista
        return acc
      }, {})
      setMotoristas(motoristasObj)
    }
  }, [motoristaData, motoristaDataLoading])

  useEffect(() => {
    if (!veiculoDataLoading && veiculoData) {
      const veiculosObj = veiculoData.reduce((acc, veiculo) => {
        acc[veiculo._id] = veiculo
        return acc
      }, {})
      setVeiculos(veiculosObj)
    }
  }, [veiculoData, veiculoDataLoading])

  console.log('data', abastecimentoData)
  const columns = [
    {
      field: 'driverID',
      headerName: 'Motorista',
      flex: 0.5,
      valueGetter: params => {
        const motorista = motoristas[params.value]
        return motorista ? motorista.name : 'Motorista não encontrado'
      }
    },
    {
      field: 'vehicleID',
      headerName: 'Veiculo',
      flex: 0.5,
      valueGetter: params => {
        const veiculo = veiculos[params.value]
        return veiculo ? veiculo.plate : 'Veículo não encontrado'
      }
    },
    {
      field: 'fuel',
      headerName: 'Combustível',
      flex: 0.3
    },
    {
      field: 'precoLitro',
      headerName: 'Preço/Litro',
      flex: 0.3
    },
    {
      field: 'kmAtual',
      headerName: 'KM Atual',
      flex: 0.3,
    },
    {
      field: 'litros',
      headerName: 'Litros',
      flex: 0.3,
    },
    {
      field: 'data',
      headerName: 'data',
      flex: 0.5,
      valueGetter: params => {
        const dataAbastecimento = new Date(params.value)
        return dataAbastecimento.toLocaleString()
      }
    }
  ]
  const handleRefresh = () => {
    abastecimentoRefetch()
  }
  return (
    <Box style={{ height: '20rem', width: '100%' }}>
      <Header />
      <Button variant="contained" size="small" onClick={handleRefresh}>
        Atualizar
      </Button>
      <DataGrid
        loading={abastecimentoDataLoading || !abastecimentoData}
        getRowId={row => row._id}
        rows={
          (abastecimentoData && abastecimentoData.abastecimentoSearch) || []
        }
        columns={columns}
        rowCount={(abastecimentoData && abastecimentoData.total) || 0}
        rowsPerPageOptions={[1, 20, 50, 100]}
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
              hideToolbar: true,
              pageSize: true
            }
          }
        }}
        sx={{
          '@media print': {
            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' }
          },
          ' .MuiDataGrid-columnSeparator': { display: 'none' }
        }}
      />
    </Box>
  )
}

export default Abastecimentos
