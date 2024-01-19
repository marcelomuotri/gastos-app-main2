import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = `http://192.168.0.21:8080/api/`;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['Entity'], // Paso 1: Definir los tipos de tags
  endpoints: (builder) => ({
    getFromEndpoint: builder.query<any, { endpoint: string; filters?: any }>({
      query: ({ endpoint, filters }) => {
        const queryString = filters
          ? '?' + new URLSearchParams(filters).toString()
          : '';
        return `${endpoint}${queryString}`;
      },
      providesTags: [{ type: 'Entity' }],
    }),
    addEntity: builder.mutation<any, { endpoint: string; entity: any }>({
      query: ({ endpoint, entity }) => ({
        url: `${endpoint}`,
        method: 'POST',
        body: entity,
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    deleteEntity: builder.mutation<any, { endpoint: string; id: string }>({
      query: ({ endpoint, id }) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    updateEntity: builder.mutation<any, { endpoint: string; entity: any }>({
      query: ({ endpoint, entity }) => ({
        url: `${endpoint}/${entity._id}`,
        method: 'PUT',
        body: entity,
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: 'users/login',
          method: 'POST',
          body: credentials,
        }
      },
    }),
  }),
})

export const {
  useGetFromEndpointQuery,
  useAddEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
  useLoginMutation
} = api
