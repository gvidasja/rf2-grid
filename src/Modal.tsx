import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

type ModalProps = { show: boolean; onClose: () => void } & React.HTMLAttributes<any>

export function Modal({ show, children, onClose }: ModalProps) {
  return show
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className={styles.modalOverlay}
            onClick={e => {
              e.stopPropagation()
              onClose()
            }}
          >
            {children}
          </div>
        </React.Fragment>,
        document.body
      )
    : null
}
