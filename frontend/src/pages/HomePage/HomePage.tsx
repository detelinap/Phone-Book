import React, { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Entry, PhonebookEntry } from "../../utils/types";
import { fetchPhonebookEntries } from "../../api/ApiService";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import './HomePage.module.css';

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<PhonebookEntry[]>([]);
  const [searchText, setSearchText] = useState("");
  const [matchingEntries, setMatchingEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    setMatchingEntries(filteredEntries);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  };

  return (
    <Container>
      <h1 className="mt-4">Phonebook Home</h1>
      <Row className="mb-3">
        <Col xs={8}>
          <Form.Control
            type="text"
            placeholder="Search by name or number"
            value={searchText}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={2}>
          <Button variant="primary" onClick={handleSearchClick}>Search</Button>
        </Col>
        <Col xs={2}>
          <Button variant="secondary" onClick={fetchEntries}>Refresh</Button>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matchingEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.phoneNumber}</td>
                <td>
                  <Link to={`/edit/${entry.id}`} className="btn btn-primary">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Link to="/add" className="btn btn-success">Add New Entry</Link>
    </Container>
  );
};

export default HomePage;
