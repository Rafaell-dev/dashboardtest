import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'api',
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
    postLogin: build.mutation({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { email, password }
      })
    }),
    postRegister: build.mutation({
      query: (payload) => ({
        url: `auth/register`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      })
    }),
    putUserAuth: build.mutation({
      query: ({ ...payload }) => ({
        url: `auth/updateUser/${payload._id}`,
        method: 'PUT',
        body: payload
      })
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

    getUser: build.query({
      query: () => `user/getUsers`,
      providesTags: [`Motoristas`]
    }),
    getUserById: build.query({
      query: id => `user/userById/${id}`,
      providesTags: (result, error, id) => [{ type: 'Motoristas', id }]
    }),
    getUsersSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'user/UsersSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['MotoristasSearch']
    }),
    postUser: build.mutation({
      query: payload => ({
        url: 'auth/register',
        method: 'POST',
        body: payload
      })
    }),
    putUser: build.mutation({
      query: ({ ...payload }) => ({
        url: `user/updateUser/${payload._id}`,
        method: 'PUT',
        body: payload
      })
    }),
    deleteUser: build.mutation({
      query: id => ({
        url: `user/deleteUser/${id}`,
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
    }),
    
    //Abastecimento
    getAbastecimento: build.query({
      query: () => `abastecimento/abastecimentos`,
      providesTags: [`Abastecimentos`]
    }),
    getAbastecimentoSearch: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'abastecimento/abastecimentosSearch',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['AbastecimentoSearch']
    }),
    postAbastecimento: build.mutation({
      query: payload => ({
        url: `abastecimento/createAbastecimento`,
        method: 'POST',
        body: payload
      })
    }),
    putAbastecimento: build.mutation({
      query: ({ ...payload }) => ({
        url: `abastecimento/updateAbastecimento/${payload._id}`,
        method: 'PUT',
        body: payload
      })
    }),


  })
})

export const refreshVeiculos = () => {
  api.endpoints.getVeiculo.invalidateTags(['Veiculos'])
}
export const refreshMotorista = () => {
  api.endpoints.getUser.invalidateTags(['Usuários'])
}
export const refreshRetirada = () => {
  api.endpoints.getRetirada.invalidateTags(['Retiradas'])
}
export const refreshAbastecimento = () => {
  api.endpoints.getAbastecimento.invalidateTags(['Abastecimentos'])
}

export const {
  usePostLoginMutation,
  useGetVeiculoQuery,
  useGetVeiculoSearchQuery,
  usePutVeiculoMutation,
  usePostVeiculoMutation,
  useDeleteVeiculoMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useGetUserSearchQuery,
  usePostUserMutation,
  usePutUserMutation,
  useDeleteUserMutation,
  useGetRetiradaQuery,
  usePutRetiradaMutation,
  usePostRetiradaMutation,
  useGetRetiradaSearchQuery,
  usePutUserAuthMutation,
  useGetAbastecimentoQuery,
  useGetAbastecimentoSearchQuery,
  usePostAbastecimentoMutation,
  usePutAbastecimentoMutation
} = api
