import React, { useEffect, useState } from 'react';
import { Accordion, ButtonGroup, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../../actions/analysisActions';
import Chart from 'chart.js/auto';

export default function TechnicalAnalysis({symbol}) {
  const dispatch = useDispatch();
  const technicalAnalysis = useSelector((state) => state.analysis?.technicalAnalysis);
  const historicalData = useSelector((state) => state.analysis.chartData);
  const [interval, setInterval] = useState('1d');
  const [range, setRange] = useState('1mo');

  useEffect(() => {
    dispatch(fetchChartData(symbol, interval, range));
  }, [dispatch, symbol, interval, range]);

  const handleDailyClick = () => {
    setInterval('1d');
    setRange('1mo');
  };

  const handleMonthlyClick = () => {
    setInterval('1mo');
    setRange('6mo');
  };

  const handleYearlyClick = () => {
    setInterval('1mo');
    setRange('5y');
  };

  const chartData = {
    labels: historicalData?.map((data) => data.date),
    datasets: [
      {
        label: 'Stock Price',
        data: historicalData?.map((data) => data.close),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header>Technical Analysis</Accordion.Header>
      <Accordion.Body>
        <Line data={chartData} />

        <ButtonGroup>
          <Button variant="secondary" onClick={handleDailyClick}>Daily</Button>
          <Button variant="secondary" onClick={handleMonthlyClick}>Monthly</Button>
          <Button variant="secondary" onClick={handleYearlyClick}>Yearly</Button>
        </ButtonGroup>

        <p>Grade: {technicalAnalysis?.grade}</p>
        <p>Score: {technicalAnalysis?.score}</p>
      </Accordion.Body>
    </Accordion.Item>
  );
}