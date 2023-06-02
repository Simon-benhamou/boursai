import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
const SearchPage = () => {

  const navigate =  useNavigate();

  const handleSearch = (symbol) => {
    console.log(`Selected stock symbol: ${symbol}`);
    navigate(`/summary/${symbol}`);
  };
  return (
    <div>
      <Container>

        <LogoText>Bursai</LogoText>
        <SearchContainer>
        <SearchBar onSearch={handleSearch} />
        </SearchContainer>
        <LinksContainer>
        </LinksContainer>
      </Container>
  
    </div>
  );
};
const LogoText = styled.h1`
  font-size: 52px;
  font-weight: bold;
  margin-left: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const Logo = styled.img`
  width: 272px;
  height: 92px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SearchInput = styled.input`
  width: 500px;
  height: 44px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 24px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  outline: none;
`;

const SearchButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 24px;
  background-color: #f2f2f2;
  color: #5f6368;
  cursor: pointer;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  & > * {
    margin-right: 20px;
    font-size: 14px;
    color: #5f6368;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default SearchPage;