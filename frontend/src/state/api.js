import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Veiculos',
    'Motoristas',
    'MotoristasSearch',
    'VeiculosSearch',
    'postMotorista',
    'putMotorista',
    'deleteMotorista',
    'VeiculosSearch',
    'putVeiculo',
    'RetiradaSearch'
  ],
  endpoints: build => ({
    getUser: build.query({
      query: id => `general/user/${id}`,
      providesTags: ['User']
    }),

    //Veículo

    getVeiculo: build.query({
      query: () => `veiculo/veiculos`,
      providesTags: [`Veiculos`]
    }),
    getVeiculoSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'veiculo/veiculosSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['VeiculosSearch']
    }),
    postVeiculo: build.mutation({
      query: payload => ({
        url: 'veiculo/createVeiculo',
        method: 'POST',
        body: payload
      })
    }),
    putVeiculo: build.mutation({
      query: ({ ...payload }) => ({
        url: `veiculo/updateVeiculo/${payload._id}`,
        method: 'PUT',
        body: payload
      })
    }),
    deleteVeiculo: build.mutation({
      query: id => ({
        url: `veiculo/deleteVeiculo/${id}`,
        method: 'DELETE'
      })
    }),

    //Motorista

    getMotorista: build.query({
      query: () => `motorista/motoristas`,
      providesTags: [`Motoristas`]
    }),
    getMotoristaById: build.query({
      query: id => `motorista/motoristaById/${id}`,
      providesTags: (result, error, id) => [{ type: 'Motoristas', id }]
    }),
    getMotoristaSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'motorista/motoristasSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['MotoristasSearch']
    }),

    postMotorista: build.mutation({
      query: payload => ({
        url: 'motorista/createMotorista',
        method: 'POST',
        body: payload
      })
    }),
    putMotorista: build.mutation({
      query: ({ ...payload }) => ({
        url: `motorista/updateMotorista/${payload._id}`,
        method: 'PUT',
        body: payload
      })
    }),
    deleteMotorista: build.mutation({
      query: id => ({
        url: `motorista/deleteMotorista/${id}`,
        method: 'DELETE'
      })
    }),

    //Retirada
    getRetirada: build.query({
      query: () => `retirada/retiradas`,
      providesTags: [`Retiradas`]
    }),
    getRetiradaSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'retirada/retiradaSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['RetiradaSearch']
    }),
    postRetirada: build.mutation({
      query: payload => ({
        url: `retirada/createRetirada`,
        method: 'POST',
        body: payload
      })
    }),
    putRetirada: build.mutation({
      query: ({ ...payload }) => ({
        url: `retirada/updateRetirada/${payload._id}`,
        method: 'PUT',
        body: payload
      })
    })
  })
})

export const refreshVeiculos = () => {
  api.endpoints.getVeiculo.invalidateTags(['Veiculos'])
}
export const refreshMotorista = () => {
  api.endpoints.getMotorista.invalidateTags(['Motoristas'])
}
export const refreshRetirada = () => {
  api.endpoints.getRetirada.invalidateTags(['Retiradas'])
}

export const {
  useGetUserQuery,
  useGetVeiculoQuery,
  useGetVeiculoSearchQuery,
  usePutVeiculoMutation,
  usePostVeiculoMutation,
  useDeleteVeiculoMutation,
  useGetMotoristaQuery,
  useGetMotoristaByIdQuery,
  useGetMotoristaSearchQuery,
  usePostMotoristaMutation,
  usePutMotoristaMutation,
  useDeleteMotoristaMutation,
  useGetRetiradaQuery,
  usePutRetiradaMutation,
  usePostRetiradaMutation,
  useGetRetiradaSearchQuery
} = api
