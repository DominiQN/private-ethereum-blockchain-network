import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

function GenericDialog({ open, onClose, title, children, buttonComps }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="dialog-title"
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      {buttonComps &&
        <DialogActions>
          {buttonComps}
        </DialogActions>
      }
    </Dialog>
  )
}

export default GenericDialog