import React from 'react'

import styles from './FormFieldset.module.css'
import { useCategories } from '../redux/selectors'

export const FormFieldset = ({ title, value, type, legend, options, onChange }) => {
  const categories = useCategories()

  let inputValue

  if (title in value) {
    inputValue = value[title]
  }

  const handleFieldChange = (e) => {
    let newValue = e.target.value

    if (typeof inputValue === 'number') {
      newValue = Number(newValue)
    }

    onChange(title, newValue)
  }

  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className={styles.inputContainer}>
        <label>
          {type === 'input' && (
            <input
              type="number"
              className={styles.inputField}
              value={inputValue}
              onChange={handleFieldChange}
              min={options[0].value}
              max={options[1].value}
            />
          )}
          {type === 'select' && (
            <select className={styles.inputField} value={inputValue} onChange={handleFieldChange}>
              {title === 'category' &&
                categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              {title !== 'category' &&
                options.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  )
                })}
            </select>
          )}
        </label>
      </div>
    </fieldset>
  )
}
