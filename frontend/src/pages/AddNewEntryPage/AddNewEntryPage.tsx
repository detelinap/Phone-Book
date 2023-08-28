import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addPhonebookEntry } from "../../api/ApiService";
import { Container } from "react-bootstrap";
import styles from "./AddNewEntryPage.module.css";
import EntryForm from "../../components/EntryForm/EntryForm";
const AddNewEntryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    try {
      await addPhonebookEntry(data);
      navigate("/");
    } catch (error) {
      console.error("Error adding new entry:", error);
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Add New Entry</h1>
        <EntryForm onSubmit={handleSubmit} buttonText="Add Entry" />
        <Link className={styles.backLink} to="/">
          Back to Home
        </Link>
      </div>
    </Container>
  );
};

export default AddNewEntryPage;
