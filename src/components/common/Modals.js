import { Button, Modal } from "react-bootstrap";

export function Modals({
  visible,
  handleClose,
  handleButtonAction,
  title,
  body,
  footer,
  buttonClose,
  buttonPrimaryAction,
  buttonPrimaryActionLabel,
  buttonSecondaryAction,
  buttonSecondaryActionLabel,
  primaryAction,
  secondaryAction
}) {
  return (
    <Modal show={visible} onHide={handleClose} className="border-warning mt-5">
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
          {buttonPrimaryAction && (
            <Button
              className="custom-btn"
              variant="outline-primary"
              onClick={primaryAction}
            >
              {buttonPrimaryActionLabel}
            </Button>
          )}
          {buttonSecondaryAction && (
            <Button
              className="custom-btn"
              variant="outline-warning"
              onClick={secondaryAction}
            >
              {buttonSecondaryActionLabel}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
