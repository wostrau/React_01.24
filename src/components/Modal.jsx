import React from 'react'

import styles from './Modal.module.css'

export const Modal = ({ onCancel, onConfirm, text }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={onCancel} />
      <dialog open={true} className={styles.modal}>
        <h2 className={styles.text}>{text}</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.button} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </dialog>
    </>
  )
}
