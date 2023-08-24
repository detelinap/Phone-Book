const { dbOperations } = require("../db/db");

module.exports = {
  fetchPhonebookEntries: async () => {
    try {
      const entries = await dbOperations.getEntries();
      return entries;
    } catch (error) {
      throw error; 
    }
  },
  fetchEntryById: async (id) => {
    try {
      const entry = await dbOperations.getEntryById(id);
      return entry;
    } catch (error) {
      throw error;
    }
  },
  updateEntry: async (id, updatedEntry) => {
    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const entry = await dbOperations.getEntryById(id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    if (!entry.hasOwnProperty("firstName")) {
      return res.status(400).json({ error: "Invalid request" });
    }

    await dbOperations.updateEntry(id, updatedEntry);
  },
  addPhonebookEntry: async (newEntry) => {
    try {
      await dbOperations.addEntry(newEntry);
    } catch (error) {
      throw error;
    }
  },
};
