import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import stockApi from '../../services/stockApi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockData } from '../../actions/analysisActions'; 
import FundamentalAnalysis from '../Analysis/FundamentalAnalysis';
import RiskManagement from '../Analysis/RiskManagement';
import SentimentAnalysis from '../Analysis/SentimentAnalysis';
import TechnicalAnalysis from '../Analysis/TechnicalAnalysis';
import { Card, Badge, Accordion, Container, Collapse } from 'react-bootstrap';
import Spinner from '../../utils/Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const CompanyLogo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const CompanyPrice = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const CompanyChange = styled.span`
  font-size: 1rem;
  margin-left: 0.5rem;
  color: ${(props) => (props.isPositive ? 'green' : 'red')};
`;

const CompanyInfo = styled.div`
  margin-top: 1rem;
`;

const CompanyInfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const CompanyInfoTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
`;

const CompanyInfoArrow = styled.span`
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;

export default function SummaryPage() {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const quoteType = useSelector((state) => state.analysis.stockData?.quoteType);
  const summaryProfile = useSelector((state) => state.analysis.stockData?.summaryProfile);
  const summaryDetail = useSelector((state) => state.analysis.stockData?.summaryDetail);
  const longName = quoteType?.longName;

  const [logoUrl, setLogoUrl] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const fetchLogo = async () => {
    const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${longName.split(',')[0]}`);
    const data = await response.json();
    const logoUrl = data[0]?.logo;
    setLogoUrl(logoUrl);
  } 

  useEffect(() => {
    dispatch(fetchStockData(symbol));
    return () => {
      dispatch(fetchStockData(null));
    }
  }, [symbol]);

useEffect(() => {
    if(longName){
      fetchLogo();
    }
  }, [longName]);

  if (!longName) {
    return <Spinner/>
  }

  const lastPriceClose = summaryDetail?.previousClose?.fmt;
  const regularMarketChangePercent = summaryDetail?.regularMarketChangePercent?.fmt;
  const longBusinessSummary = summaryProfile?.longBusinessSummary;
  const fullTimeEmployees = summaryProfile?.fullTimeEmployees;
  const sector = summaryProfile?.sector;
  const industryDisp = summaryProfile?.industry;
  const country = summaryProfile?.country;


  const handleInfoToggle = () => {
    setShowInfo(!showInfo);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Container className='p-4'>
      <Button onClick={handleGoBack}>Back</Button>
      <CompanyHeader>
        <div className='d-flex align-items-center'>
          <CompanyLogo src={logoUrl} alt="Company Logo" />
          <CompanyName className='d-flex'>{longName}
          <CompanyInfoHeader onClick={handleInfoToggle}>
          <CompanyInfoArrow>{showInfo ? '▲' : '▼'}</CompanyInfoArrow>
        </CompanyInfoHeader>
          </CompanyName>
        </div>
        <div className='d-flex align-items-center'>
          <CompanyPrice>{lastPriceClose}</CompanyPrice>
          <CompanyChange isPositive={regularMarketChangePercent > 0}>
            ({regularMarketChangePercent}%)
          </CompanyChange>
        </div>
      </CompanyHeader>
      <CompanyInfo>
        
        <Collapse in={showInfo}>
          <div>
            <ul>
              <li><strong>Employees:</strong> {fullTimeEmployees}</li>
              <li><strong>Sector:</strong> {sector}</li>
              <li><strong>Industry:</strong> {industryDisp}</li>
              <li><strong>Country:</strong> {country}</li>
            </ul>
            <p>{longBusinessSummary}</p>
          </div>
        </Collapse>
      </CompanyInfo>
      <Accordion defaultActiveKey="0">
        <TechnicalAnalysis symbol={symbol} />
        <FundamentalAnalysis symbol={symbol} />
        <SentimentAnalysis symbol={symbol} />
        <RiskManagement symbol={symbol} />
      </Accordion>
    </Container>
  );
}
const Button = styled.button`
  position: absolute;
  left: 60px;
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