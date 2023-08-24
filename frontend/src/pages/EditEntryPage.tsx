import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { phoneNumberRegex } from "../utils/constants";
import { fetchEntryById, updateEntry } from "../api/ApiService";
import { Entry, PhonebookEntry } from "../utils/types";
import { Form, Button } from "react-bootstrap"; 


const EditEntryPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  useEffect(() => {
    if (id) {
      fetchEntryById(id)
        .then((entry: Entry) => {
          setFirstName(entry.firstName);
          setLastName(entry.lastName);
          setPhoneNumber(entry.phoneNumber);
        })
        .catch((errorMsg: string) => {
          console.error("Error fetching entry details:", errorMsg);
        });
    }
  }, [id]);

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

    const updatedEntry: PhonebookEntry = {
      id: id ? Number(id) : 0, // Convert id to number if it's defined
      firstName,
      lastName,
      phoneNumber,
    };

    try {
      if (id) await updateEntry(id, updatedEntry); // Call the updateEntry function
      navigate("/");
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div>
      <h1>Edit Entry</h1>
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
          Save Changes
        </Button>
      </Form>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default EditEntryPage;
