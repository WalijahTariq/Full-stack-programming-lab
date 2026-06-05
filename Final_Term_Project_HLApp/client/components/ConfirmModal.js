import React from 'react'

export default function ConfirmModal({ open, title='Confirm', message, onConfirm, onCancel }){
  if(!open) return null
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-title">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-actions">
          <button className="button-secondary modal-button" onClick={onCancel}>Cancel</button>
          <button className="modal-button" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
