import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddNewEntryPage from './pages/AddNewEntryPage';
import EditEntryPage from './pages/EditEntryPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddNewEntryPage />} />
        <Route path="/edit/:id" element={<EditEntryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
