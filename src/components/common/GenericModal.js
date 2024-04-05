import React from 'react'
import { Button, Modal } from "react-bootstrap";

export function GenericModal({
  showModal,
  handleClose,
  handleButtonAction,
  title,
  body,
  buttonClose,
  buttonAction,
  footer
}) {

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className="border-warning mt-5"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title><h5 className='modal-title mt-1'>{title}</h5></Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>

      {footer && (
        <Modal.Footer>
          {buttonClose && (
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          )}
          {buttonAction && (
            <Button variant="primary" onClick={handleButtonAction}>
              Guardar Cambios
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
