import React, { useEffect, useState } from 'react';
import { Accordion, ButtonGroup, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../../actions/analysisActions';
import Chart from 'chart.js/auto';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function TechnicalAnalysis({symbol}) {
  const dispatch = useDispatch();
  const technicalAnalysis = useSelector((state) => state.analysis?.technicalAnalysis);
  const historicalData = useSelector((state) => state.analysis.chartData);
  const [interval, setInterval] = useState('1d');
  const [range, setRange] = useState('1mo');
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(fetchChartData(symbol, interval, range));

  }, [dispatch, symbol, interval, range]);

  useEffect(() => {
    const stockAnalysis = localStorage.getItem('StockAnalysis')
    let parsedStockAnalysis = undefined;
    if(stockAnalysis){
      parsedStockAnalysis = JSON.parse(stockAnalysis)
      if(parsedStockAnalysis[symbol]){
        setData(parsedStockAnalysis[symbol])
      }
    }
    else if(historicalData && (stockAnalysis || parsedStockAnalysis?.[symbol])){
    Anaylsis();
    }
  }, [historicalData]);
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
  async function askGPT  (prompt, model, format) {
    try {
      const response = await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 1450,
        //format: format
      });
      return response.data.choices?.[0]?.text.trim();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const Anaylsis = async() => {
    //Step 1: Prepare the Data
    const stockData = {
      symbol: symbol,
      historicalData: historicalData.slice(0, 10)
    }
    const formattedDataPrompt = `Given ${JSON.stringify(stockData)},
     Perform analysis and provide predictions on the likelihood of the stock option going up or down, give a grade, 
     and the potential increase in percentage by day.
     this is an example of the expected output for the stock option ${symbol}:
     {
      "grade": "A", // very recommended
      "prediction": "up", // up or down
      "percentageDaily": 0.05 // 0.05% increase
      "explanation": "The stock is expected to go up because of the recent news about the company's new product."
     }`
    const result = await askGPT(formattedDataPrompt, 'davinci', 'text')
    const stockAnalysis = localStorage.getItem('StockAnalysis')
    if(stockAnalysis && result){
      const parsedStockAnalysis = JSON.parse(stockAnalysis)
      parsedStockAnalysis[symbol] = result
      localStorage.setItem('StockAnalysis', JSON.stringify(parsedStockAnalysis))
    }else if(result){
      localStorage.setItem('StockAnalysis', JSON.stringify({[symbol]: result}))
    }
    // setData(JSON.parse(result))
    // const formattedData = await dispatch(askGPT(formattedDataPrompt, 'text-davinci-002','json'));
    // console.log(formattedData)
    //Step 2: Define the Task
//     const task = await openai.complete({
//       prompt: 'Define the task for the stock analysis (e.g., regression or classification).',
//       // Additional options for temperature, max tokens, etc.
//     });
//     //Step 3: Train the Model

//     const trainedModel = await openai.complete({
//       prompt: 'Train the OpenAI model using the formatted data and specified task.',
//       // Additional options for temperature, max tokens, etc.
//     });
//     //Step 4: Make Predictions
//     const predictions = await openai.complete({
//       prompt: 'Given new stock data, make predictions using the trained model.',
//       // Additional options for temperature, max tokens, etc.
//     });
//     //Step 5: Retrieve the Grade
//     const grade = await openai.complete({
//       prompt: 'Based on the predictions, retrieve the grade indicating the likelihood of the stock going up or down.',
//       // Additional options for temperature, max tokens, etc.
//     });
//     const prompt = `
// Given the historical stock data:
// ${JSON.stringify(historicalData)}

// Perform analysis and provide predictions on the likelihood of the stock going up or down.
// `;
//     const predi = await dispatch(askGPT(prompt, 'davinci'));
  }
    
    



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