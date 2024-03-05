import React from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import QuizIcon from '@mui/icons-material/Quiz'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <QuizIcon />
          </IconButton>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            QUIZ APP
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
