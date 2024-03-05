import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Grid } from '@mui/material'

import { Header } from './components/Header';

export const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Outlet />
        </Grid>
      </Container>
    </>
  )
}
