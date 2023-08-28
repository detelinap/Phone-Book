import React, { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Entry, PhonebookEntry } from "../../utils/types";
import { fetchPhonebookEntries } from "../../api/ApiService";
import PhonebookTable from "../../components/PhonebookTable/PhonebookTable";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import styles from "./HomePage.module.css";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<PhonebookEntry[]>([]);
  const [searchText, setSearchText] = useState("");
  const [matchingEntries, setMatchingEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noEntriesModalVisible, setNoEntriesModalVisible] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    setLoading(true);
    setError(null);

    fetchPhonebookEntries()
      .then((data: PhonebookEntry[]) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((errorMsg: string) => {
        setError("Error fetching entries");
        setLoading(false);
      });
  };

  const handleSearchClick = () => {
    const filteredEntries = entries.filter(
      (entry) =>
        entry.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.phoneNumber.includes(searchText)
    );

    if (filteredEntries.length === 0) {
      setNoEntriesModalVisible(true);
    } else {
      setMatchingEntries(filteredEntries);
      setNoEntriesModalVisible(false);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  };

  const handleCloseNoEntriesModal = () => {
    setNoEntriesModalVisible(false);
  };

  return (
    <Container className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.mt4}>Phonebook </h1>
        <Row className={styles.mb3}>
          <Col xs={12} md={6} className="mx-auto">
            <Form.Control
              type="text"
              placeholder="Search by name or number"
              value={searchText}
              onChange={handleSearchChange}
              className={styles.largerSearch}
            />
          </Col>
          <Col xs={12} md={2} className="mx-auto">
            <Button
              variant="primary"
              onClick={handleSearchClick}
              className={styles.centeredButton}
            >
              Search
            </Button>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {matchingEntries.length > 0 ? (
              <PhonebookTable entries={matchingEntries} />
            ) : null}
          </>
        )}
        <Link to="/add" className={styles.addButton}>
          Add New Entry
        </Link>
      </div>

      <ErrorModal
        show={noEntriesModalVisible}
        onClose={handleCloseNoEntriesModal}
        title="No Entries Found"
        errorMessage="No entries match your search criteria."
      />
    </Container>
  );
};

export default HomePage;
