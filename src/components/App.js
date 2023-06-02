import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './Search/SearchPage';
import SummaryPage from './Summary/SummaryPage';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/summary/:symbol" element={<SummaryPage />} />
    </Routes>
  </Router>)
};

export default App;