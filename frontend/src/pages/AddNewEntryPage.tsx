import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { phoneNumberRegex } from "../utils/constants";
import { addPhonebookEntry } from "../api/ApiService";
import { Form, Button } from "react-bootstrap"; // Import required components from React Bootstrap

const AddNewEntryPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (phoneNumberError) {
      return;
    }

    const newEntry = {
      firstName,
      lastName,
      phoneNumber,
    };

    try {
      await addPhonebookEntry(newEntry);
      navigate("/"); 
    } catch (error) {
      console.error("Error adding new entry:", error);
    }
  };

  return (
    <div>
      <h1>Add New Entry</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
          {phoneNumberError && (
            <div className="error-message">{phoneNumberError}</div>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Entry
        </Button>
      </Form>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default AddNewEntryPage;
