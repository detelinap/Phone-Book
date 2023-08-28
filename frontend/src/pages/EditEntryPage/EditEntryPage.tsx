import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchEntryById, updateEntry } from "../../api/ApiService";
import { Entry } from "../../utils/types";
import EntryForm from "../../components/EntryForm/EntryForm";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import styles from "./EditEntryPage.module.css"; 
import { Container } from "react-bootstrap";

const EditEntryPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const initialFormValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  useEffect(() => {
    if (id) {
      fetchEntryById(id)
        .then((entry: Entry) => {
          setInitialFormValues(entry);
        })
        .catch((errorMsg: string) => {
          displayErrorModal("Error fetching entry details:", errorMsg);
        });
    }
  }, [id]);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setInitialFormValues = (entry: Entry) => {
    setFormValues({
      firstName: entry.firstName,
      lastName: entry.lastName,
      phoneNumber: entry.phoneNumber,
    });
  };

  const handleSubmit = async (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    try {
      if (id) {
        const updatedEntry: Entry = {
          id: Number(id),
          ...data,
        };
        await updateEntry(id, updatedEntry);
      }
      navigate("/");
    } catch (error) {
      displayErrorModal("Error updating entry:", error as string);
    }
  };

  const displayErrorModal = (title: string, message: string) => {
    setErrorMessage(`${title} ${message}`);
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <Container className={styles.container}>
    <div className={styles.formWrapper}>
      <h1>Edit Entry</h1>
      <EntryForm
        initialValues={formValues}
        onSubmit={handleSubmit}
        buttonText="Save Changes"
      />
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
      <ErrorModal
        show={errorModalVisible}
        onClose={closeErrorModal}
        title="Error"
        errorMessage={errorMessage}
      />
    </div>
    </Container>
  );
};

export default EditEntryPage;
