import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Entry } from "../../utils/types";
import styles from "./PhonebookTable.module.css"; // Import the CSS module

interface PhonebookTableProps {
  entries: Entry[];
}

const PhonebookTable: React.FC<PhonebookTableProps> = ({ entries }) => {
  return (
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
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.firstName}</td>
            <td>{entry.lastName}</td>
            <td>{entry.phoneNumber}</td>
            <td>
              <Link to={`/edit/${entry.id}`} className={`btn btn-primary ${styles.editButton}`}>
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PhonebookTable;
