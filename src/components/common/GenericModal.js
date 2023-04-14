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
        <Modal.Title className="table-header">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>

      {footer && (
        <Modal.Footer>
          {buttonClose && (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          )}
          {buttonAction && (
            <Button variant="primary" onClick={handleButtonAction}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
