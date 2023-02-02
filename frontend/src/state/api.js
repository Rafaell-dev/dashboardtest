import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Veiculos',
    'Motoristas',
    'MotoristasSearch',
    'VeiculosSearch'
  ],
  endpoints: build => ({
    getUser: build.query({
      query: id => `general/user/${id}`,
      providesTags: ['User']
    }),
    getVeiculo: build.query({
      query: () => `client/veiculos`,
      providesTags: [`Veiculos`]
    }),
    getMotorista: build.query({
      query: () => `client/motoristas`,
      providesTags: [`Motoristas`]
    }),
    getMotoristaSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/motoristasSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['MotoristasSearch']
    }),
    getVeiculoSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/veiculosSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['VeiculosSearch']
    })
  })
})

export const {
  useGetUserQuery,
  useGetVeiculoQuery,
  useGetMotoristaQuery,
  useGetMotoristaSearchQuery,
  useGetVeiculoSearchQuery
} = api
