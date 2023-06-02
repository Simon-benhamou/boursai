import React, { useState } from 'react';
import styled from 'styled-components';
import {debounce} from 'lodash';
import  axios from 'axios';
import stockApi from '../../services/stockApi';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleStockSearch = async () => {
      const data =  await stockApi.fetchDetails(query);
       if(data) return  setSuggestions(data?.quotes?.map((quote) => quote.symbol));
        return setSuggestions([]);       
    }
  const handleInputChange = async (event) => {
    const query = event.target.value;
    setQuery(query);
    debounce(handleStockSearch, 500)
  };

  const handleSuggestionClick = (symbol) => {
    setQuery(symbol);
    setSuggestions([]);
    onSearch(symbol);
  };

  return (
    <Container>
      <SearchInput type="text" placeholder="Search for a stock" value={query} onChange={handleInputChange} />
      <Button onClick={handleStockSearch}> Search</Button>
      {suggestions?.length > 0 && (
        <SuggestionsList>
          {suggestions.map((symbol) => (
            <SuggestionItem key={symbol} onClick={() => handleSuggestionClick(symbol)}>
              {symbol}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 24px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  outline: none;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SuggestionItem = styled.li`
  padding: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;
 //write a button with nice styling
const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 24px;
    background-color: #f2f2f2;
    color: #5f6368;
    cursor: pointer;
    `;
export default SearchBar;