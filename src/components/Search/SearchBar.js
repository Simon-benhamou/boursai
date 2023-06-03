import React, { useState } from 'react';
import styled from 'styled-components';
import {debounce} from 'lodash';
import  axios from 'axios';
import stockApi from '../../services/stockApi';
import Spinner from '../../utils/Spinner';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleStockSearch = async () => {
    setLoading(true);
    setSuggestions([]);
      const data =  await stockApi.fetchDetails(query);
      setLoading(false);
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
    <div>
      
      <Container class="container d-flex">
        <input className="input" name="text"value={query}  onChange={handleInputChange}  type="text" required="" placeholder='Search for a stock'/>
        <Button className='mt-3' onClick={handleStockSearch}> Search</Button>
      </Container>
      {suggestions?.length > 0 && (
        <SuggestionsList>
          {suggestions.map((symbol) => (
            <SuggestionItem key={symbol} onClick={() => handleSuggestionClick(symbol)}>
              {symbol}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
      {loading && <Spinner />}
    </div>
  );
};

const Container = styled.div`

  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;


.label {
  font-size: 15px;
  padding-left: 10px;
  position: absolute;
  top: 13px;
  transition: 0.3s;
  pointer-events: none;
}

.input {
  width: 400px;
  height: 45px;
  border: none;
  outline: none;
  padding: 0px 7px;
  border-radius: 6px;
  color: #fff;
  font-size: 15px;
  background-color: transparent;
  box-shadow: 3px 3px 10px rgba(0,0,0,1),
  -1px -1px 6px rgba(255, 255, 255, 0.4);
}

.input:focus {
  border: 2px solid transparent;
  color: #fff;
  box-shadow: 3px 3px 10px rgba(0,0,0,1),
  -1px -1px 6px rgba(255, 255, 255, 0.4),
  inset 3px 3px 10px rgba(0,0,0,1),
  inset -1px -1px 6px rgba(255, 255, 255, 0.4);
}

.input:valid ~ .label,
.input:focus ~ .label {
  transition: 0.3s;
  padding-left: 2px;
  transform: translateY(-35px);
}

.input:valid,
.input:focus {
  box-shadow: 3px 3px 10px rgba(0,0,0,1),
  -1px -1px 6px rgba(255, 255, 255, 0.4),
  inset 3px 3px 10px rgba(0,0,0,1),
  inset -1px -1px 6px rgba(255, 255, 255, 0.4);
}
`;


const SuggestionsList = styled.ul`

  z-index: 1;
  padding: 0;
  margin: 0;
  width: 100%;
  color: #ffff;
  list-style: none;
  border-radius: 4px;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  font-size: 16px;
  color: #ffff;
  cursor: pointer;

  &:hover {
    color: fuchsia;
  }
`;
 //write a button with nice styling
const Button = styled.button`
  
 font-weight: bold;
 letter-spacing: 0.1em;
 border: none;
 border-radius: 1.1em;
 background-color: #212121;
 color: white;
 padding: 1em 2em;
 transition: box-shadow ease-in-out 0.3s,
             background-color ease-in-out 0.1s,
             letter-spacing ease-in-out 0.1s,
             transform ease-in-out 0.1s;
 /* box-shadow: 13px 13px 10px #1c1c1c,
             -13px -13px 10px #262626; */


:hover {
 box-shadow: 16px 16px 33px #121212,
                   -16px -16px 33px #303030;
}

:active {
 box-shadow: 16px 16px 33px #121212,
                   -16px -16px 33px #303030,
 fuchsia 0px 0px 30px 5px;
 background-color: fuchsia;
 transform: scale(0.95);
}

    `;
export default SearchBar;