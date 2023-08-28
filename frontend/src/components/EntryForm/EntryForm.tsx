import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./EntryForm.module.css";
import { phoneNumberRegex } from "../../utils/constants";

interface EntryFormProps {
  initialValues?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  onSubmit: (data: { firstName: string; lastName: string; phoneNumber: string }) => void;
  buttonText: string;
}

const EntryForm: React.FC<EntryFormProps> = ({ initialValues, onSubmit, buttonText }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setFirstName(initialValues.firstName);
      setLastName(initialValues.lastName);
      setPhoneNumber(initialValues.phoneNumber);
    }
  }, [initialValues]);

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);

    if (!phoneNumberRegex.test(newPhoneNumber)) {
      setPhoneNumberError("Invalid phone number format");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (phoneNumberError) {
      return;
    }

    onSubmit({ firstName, lastName, phoneNumber });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
          className={styles.formControl}
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
          className={styles.formControl}
        />
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Phone Number</Form.Label>
        <Form.Control
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
          className={styles.formControl}
        />
        {phoneNumberError && (
          <div className={styles.errorMessage}>{phoneNumberError}</div>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" className={styles.addButton}>
        {buttonText}
      </Button>
    </Form>
  );
};

export default EntryForm;
