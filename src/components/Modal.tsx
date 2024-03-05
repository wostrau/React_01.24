import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

type ModalProps = {
  onConfirm: () => void
  onCancel: () => void
}

export const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <>
      <Dialog open>
        <DialogTitle>Confirm end of the quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to end up the quiz and see your result?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} autoFocus>
            Confirm
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
