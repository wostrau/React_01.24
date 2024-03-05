import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
      <CircularProgress />
    </Box>
  )
}
