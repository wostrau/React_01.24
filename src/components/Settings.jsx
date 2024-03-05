import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, FormGroup, Box } from '@mui/material'

import { SETTINGS } from '../utils/settings'

export const Settings = (props) => {
  const { settings, isLoading, categories, onChange } = props

  const handleFieldChange = (event, setting) => {
    let newValue = event.target.value

    if (typeof setting.value === 'number') {
      newValue = Number(newValue)
    }

    onChange(setting.title, newValue)
  }

  return (
    <Box padding={3}>
      {SETTINGS.map((setting) => {
        const inputValue = settings[setting.title]
        return (
          <FormGroup
            key={setting.id}
            sx={{
              padding: '10px'
            }}>
            <FormControl>
              {setting.type === 'input' && (
                <TextField
                  label={setting.legend}
                  type="number"
                  value={inputValue}
                  onChange={(e) => handleFieldChange(e, setting)}
                  inputProps={{ min: setting.options[0].value, max: setting.options[1].value }}
                />
              )}
              {setting.type === 'select' && (
                <>
                  <InputLabel>{setting.legend}</InputLabel>
                  <Select
                    label={setting.legend}
                    value={inputValue}
                    onChange={(e) => handleFieldChange(e, setting)}>
                    {isLoading && setting.title === 'category' && <MenuItem disabled />}

                    {!isLoading &&
                      setting.title === 'category' &&
                      categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}

                    {setting.title !== 'category' &&
                      setting.options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
            </FormControl>
          </FormGroup>
        )
      })}
    </Box>
  )
}
