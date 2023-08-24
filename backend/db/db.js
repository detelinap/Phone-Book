const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "./db/phonebook.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Error opening the database:", err.message);
    } else {
      console.log("Connected to the database");
    }
  }
);

function initializeDatabase() {
  db.run(`
      CREATE TABLE IF NOT EXISTS phonebook (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        phoneNumber TEXT NOT NULL
      )
    `);

  db.get("SELECT COUNT(*) AS count FROM phonebook", [], (err, row) => {
    if (err) {
      console.error("Error checking for existing entries:", err);
    } else {
      if (row.count === 0) {
        const initialEntries = [
          { firstName: "John", lastName: "Doe", phoneNumber: "+39 02 1234567" },
          {
            firstName: "Jane",
            lastName: "Smith",
            phoneNumber: "+39 02 9876543",
          },
          {
            firstName: "Pedro",
            lastName: "Pascal",
            phoneNumber: "+34 02 9887543",
          },
        ];

        initialEntries.forEach((entry) => {
          db.run(
            "INSERT INTO phonebook (firstName, lastName, phoneNumber) VALUES (?, ?, ?)",
            [entry.firstName, entry.lastName, entry.phoneNumber],
            (error) => {
              if (error) {
                console.error("Error inserting initial data:", error);
              } else {
                console.log("Initial data inserted successfully");
              }
            }
          );
        });
      } else {
        console.log("Entries already exist in the database");
      }
    }
  });
}

const dbOperations = {
  getEntries: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM phonebook", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getEntryById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM phonebook WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  updateEntry: (id, updatedEntry) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE phonebook SET firstName = ?, lastName = ?, phoneNumber = ? WHERE id = ?",
        [
          updatedEntry.firstName,
          updatedEntry.lastName,
          updatedEntry.phoneNumber,
          id,
        ],
        (err) => {
          if (err) {
            throw err;
          } else {
            resolve();
          }
        }
      );
    });
  },
  addEntry: (entry) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO phonebook (firstName, lastName, phoneNumber) VALUES (?, ?, ?)",
        [entry.firstName, entry.lastName, entry.phoneNumber],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
};

module.exports = { initializeDatabase, dbOperations };
