import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { generateApiUrl } from '../utils/utils'

export type CategoryType = {
  id: number
  name: string
}

type CategoryResponse = {
  trivia_categories: CategoryType[]
}

export type QuestionType = {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

type QuestionResponse = {
  results: QuestionType[]
}

export type SettingsType = {
  amount: number
  category: number | string
  difficulty: string
  type: string
  time: number
}

export const triviaApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://opentdb.com' }),
  reducerPath: 'triviaApi',
  endpoints: (builder) => ({
    fetchCategories: builder.query<CategoryType[], void>({
      query: () => '/api_category.php',
      transformResponse: (response: CategoryResponse) => response.trivia_categories
    }),
    fetchQuestions: builder.query<QuestionType[], SettingsType>({
      query: (settings: SettingsType) => {
        const selectedSettings = generateApiUrl(settings)
        return `/api.php?${selectedSettings}`
      },
      transformResponse: (response: QuestionResponse) => response.results
    })
  })
})
