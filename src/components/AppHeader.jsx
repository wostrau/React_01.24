import React from 'react'

import styles from './AppHeader.module.css'

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.headerImg}
        src="https://www.fssu.ie/app/plugins/advanced-custom-fields-pro/assets/images/icons/icon-help.svg"
        alt="Quiz logo"
      />
      <h1 className={styles.headerTitle}>Quiz App</h1>
    </header>
  )
}
