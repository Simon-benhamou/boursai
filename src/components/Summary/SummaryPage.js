import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import stockApi from '../../services/stockApi';
import { useSelector,useDispatch } from 'react-redux';
import { fetchStockData } from '../../actions/analysisActions'; 
import FundamentalAnalysis from '../Analysis/FundamentalAnalysis';
import RiskManagement from '../Analysis/RiskManagement';
import SentimentAnalysis from '../Analysis/SentimentAnalysis';
import TechnicalAnalysis from '../Analysis/TechnicalAnalysis';

export default function SummaryPage() {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const quoteType = useSelector((state) => state.analysis.stockData?.quoteType);
  const longName = quoteType?.longName;

  useEffect(() => {
    dispatch(fetchStockData(symbol));
  }, [symbol]);

  if (!longName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{longName}</h1>
      <FundamentalAnalysis symbol={symbol} />
      <RiskManagement symbol={symbol} />
      <SentimentAnalysis symbol={symbol} />
      <TechnicalAnalysis symbol={symbol} />

      {/* <p>{details?.description}</p>
      <p>Price: {details?.price}</p>
      <p>Volume: {details?.volume}</p>
      <p>Market Cap: {details?.marketCap}</p> */}
    </div>
  );
}