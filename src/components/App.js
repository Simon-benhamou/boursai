import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './Search/SearchPage';
import SummaryPage from './Summary/SummaryPage';
import styled from 'styled-components';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Container><SearchPage /></Container>} />
      <Route path="/summary/:symbol" element={<Container><SummaryPage /></Container>} />
    </Routes>
  </Router>)
};

export default App;
const Container = styled.div`
 background-color: #333333;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  `