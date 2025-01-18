import React from 'react'
import '../../assets/Styles/ConfirmDialog.css'

const ConfirmDialog = ({ visible, onConfirm, onCancel }) => {
    if(visible === false) return null;
    return (
        <div className="confirm-dialog-overlay">
            {
                visible === true && (
                    <div className="confirm-dialog-container">
                        <p>Are you sure you want to logout?</p>
                        <div className="confirm-dialog-buttons">
                            <button onClick={onConfirm} className="confirm-btn">OK</button>
                            <button onClick={onCancel} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ConfirmDialog
