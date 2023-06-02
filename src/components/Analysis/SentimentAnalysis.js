import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSentimentAnalysis } from '../../actions/analysisActions';
import openai from 'openai';

export default function SentimentAnalysis({symbol}) {
  const dispatch = useDispatch();
  const sentimentAnalysis = useSelector((state) => state.analysis?.sentimentAnalysis);

  useEffect(() => {
   dispatch(fetchSentimentAnalysis(symbol));
  }, [dispatch]);

  if (!sentimentAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <p>Grade: {sentimentAnalysis?.grade}</p>
      <p>Score: {sentimentAnalysis?.score}</p>
      {/* Display chart here */}
    </div>
  );
}
