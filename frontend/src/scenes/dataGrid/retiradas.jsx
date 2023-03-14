import { DataGrid } from '@mui/x-data-grid'
import { Button, useTheme } from '@mui/material'
import {
  useGetMotoristaQuery,
  useGetRetiradaSearchQuery,
  useGetVeiculoQuery,
  usePutMotoristaMutation,
  usePutRetiradaMutation,
  usePutVeiculoMutation
} from 'state/api'
import { useEffect, useState } from 'react'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const RetiradaDataGrid = () => {
  const theme = useTheme()

  //Values to be send to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [searchInput, setSearchInput] = useState('')

  const {
    data: retiradaData,
    isLoading: retiradaDataLoading,
    refetch: retiradaRefetch
  } = useGetRetiradaSearchQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })

  const { data: motoristaData, isLoading: motoristaDataLoading } =
    useGetMotoristaQuery()
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

  const columns = [
    {
      field: 'vehicleID',
      headerName: 'Veículo',
      flex: 0.3,
      valueGetter: params => {
        const veiculo = veiculos[params.value]
        return veiculo ? veiculo.plate : 'Veículo não encontrado'
      }
    },
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
      field: 'dataRetirada',
      headerName: 'Data Retirada',
      flex: 0.5,
      valueGetter: params => {
        const dataRetorno = new Date(params.value)
        return dataRetorno.toLocaleString()
      }
    },
    {
      field: 'dataRetorno',
      headerName: 'Data Devolução',
      flex: 0.5,
      valueGetter: params => {
        const dataRetorno = new Date(params.value)
        return dataRetorno.toLocaleString()
      }
    },
    {
      field: 'statusRetirada',
      headerName: 'Status',
      flex: 0.5,
      valueGetter: params => {
        return params.row ? params.row.statusRetirada : 'null'
      }
    },
    {
      field: 'Finalizar',
      headerName: '',
      renderCell: params => (
        <Button
          disabled={params.row.statusRetirada !== 'Aberto'}
          variant="contained"
          onClick={() => handleFinalizar(params.row)}
          sx={{
            background: theme.palette.background.alt
          }}
        >
          Finalizar
        </Button>
      )
    }
  ]
  const [
    updateVehicle,
    {
      isLoading: updateVehicleLoading,
      isError: updateVehicleIsError,
      isSuccess: updateVehicleIsSuccess
    }
  ] = usePutVeiculoMutation({ refetchOnMountOrArgChange: true })

  const [
    updateDriver,
    {
      isLoading: updateDriverLoading,
      isError: updateDriverIsError,
      isSuccess: updateDriverIsSuccess
    }
  ] = usePutMotoristaMutation({ refetchOnMountOrArgChange: true })

  const [
    updateRetirada,
    {
      isLoading: updateRetiradaLoading,
      isError: updateRetiradaIsError,
      isSuccess: updateRetiradaIsSuccess
    }
  ] = usePutRetiradaMutation({ refetchOnMountOrArgChange: true })

  const handleRefresh = () => {
    retiradaRefetch()
  }

  const handleFinalizar = async params => {
    try {
      const vehicleToUpdate = {
        _id: params.vehicleID,
        status: 'disponivel'
      }

      const driverToUpdate = {
        _id: params.driverID,
        reservedVehicle: false
      }

      const retiradaToUpdate = {
        _id: params._id,
        statusRetirada: 'Encerrado'
      }

      await updateVehicle(vehicleToUpdate)
      await updateDriver(driverToUpdate)
      await updateRetirada(retiradaToUpdate)

      handleRefresh()
    } catch (error) {
      console.error('Erro ao salvar os dados:', error)
    }
  }
  return (
    <div style={{ height: '20rem', width: '100%' }}>
      <DataGrid
        loading={retiradaDataLoading || !retiradaData}
        getRowId={row => row._id}
        rows={(retiradaData && retiradaData.retiradaSearch) || []}
        columns={columns}
        rowCount={(retiradaData && retiradaData.total) || 0}
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
            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0F, 0.87)' }
          },

          ' .MuiDataGrid-columnSeparator': { display: 'none' }
        }}
      />
    </div>
  )
}
export default RetiradaDataGrid
