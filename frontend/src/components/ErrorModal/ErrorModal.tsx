import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose, title, errorMessage }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered 
      dialogClassName={styles.modalContainer} 
    >
      <Modal.Header>
        <Modal.Title className={styles.title}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} className={styles.closeButton}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
