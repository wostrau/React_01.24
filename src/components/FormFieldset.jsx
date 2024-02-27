import React from 'react'

import styles from './FormFieldset.module.css'

export const FormFieldset = ({ isLoading, categories, inputValue, onChange, ...restProps }) => {
  const { title, type, legend, options } = restProps

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
              {isLoading && title === 'category' && <option>Loading...</option>}
              {!isLoading &&
                title === 'category' &&
                Array.isArray(categories) &&
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
