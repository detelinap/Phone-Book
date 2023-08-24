const express = require('express');
const router = express.Router();
const apiService = require('../api/ApiService'); 
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const entries = await apiService.fetchPhonebookEntries();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entries' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await apiService.fetchEntryById(id);
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entry by ID' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEntry = req.body;

  const idNumber = Number(id);
  if (!idNumber || isNaN(idNumber)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  await apiService.updateEntry(idNumber, updatedEntry);
  res.json({ message: 'Entry updated successfully' });
});

router.post('/', [
  async (req, res) => {
    try {
      const newEntry = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await apiService.addPhonebookEntry(newEntry);
      res.json({ message: 'Entry added successfully' });
    } catch (error) {
      console.error("Error adding entry:", error);
      res.status(500).json({ error: 'Error adding entry' });
    }
  }
]);


router.get('*', (req, res) => {
  res.send('404 Page Not Found');
});

module.exports = router;
