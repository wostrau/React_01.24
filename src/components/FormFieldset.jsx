import React from 'react'
import styles from './FormFieldset.module.css'

export const FormFieldset = ({ title, value, type, legend, options, onChange }) => {
  let inputValue

  if (title in value) {
    inputValue = value[title]
  }

  const handleFieldChange = (e) => {
    onChange(title, e.target.value)
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
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </label>
      </div>
    </fieldset>
  )
}
