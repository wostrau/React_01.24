import React, { createContext, useContext, useState } from 'react'

const SettingsContext = createContext()

export const useSettingsContext = () => useContext(SettingsContext)

const initialState = {
  quantity: 5,
  category: 'any',
  difficulty: 'any',
  type: 'any',
  time: 300000
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialState)

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings })
  }

  const resetSettings = () => {
    setSettings(initialState)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
