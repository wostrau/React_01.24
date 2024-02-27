import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { generateApiUrl } from '../utils/utils'

export const triviaApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://opentdb.com' }),
  reducerPath: 'triviaApi',
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => '/api_category.php',
      transformResponse: (response) => response.trivia_categories
    }),
    fetchQuestions: builder.query({
      query: (settings) => {
        const selectedSettings = generateApiUrl(settings)
        return `/api.php?${selectedSettings}`
      },
      transformResponse: (response) => response.results
    })
  })
})

export const { useFetchCategoriesQuery, useFetchQuestionsQuery } = triviaApi
