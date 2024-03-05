import React, { ChangeEvent } from 'react'
import { SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import { SETTINGS, SettingDefaultType } from '../utils/settings'
import { CategoryType, SettingsType } from '../store/triviaApi'

type SettingsProps = {
  settings: SettingsType
  isLoading: boolean
  categories: CategoryType[]
  onChange: (setting: string, value: string | number) => void
}

export const Settings: React.FC<SettingsProps> = (props) => {
  const { settings, isLoading, categories, onChange } = props

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>,
    setting: SettingDefaultType
  ) => {
    let newValue = event.target.value

    if (typeof setting.options[0].value === 'number') {
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
