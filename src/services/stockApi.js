import axios from 'axios';
import { unescape } from 'lodash';
import * as openai from 'openai';
// Example API function to fetch stock data
const endode = (string) => window.btoa(unescape(encodeURIComponent(string)))
const decode = (string) => decodeURIComponent(escape(window.atob(string)))
const api = {
  summary : 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
  autocomplete: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
  news: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-newslist',
  headlines: 'https://finance.yahoo.com/rss/headline',
  everyNews: 'https://newsapi.org/v2/everything',
  serverAnalaysis:'http://localhost:8085/api/sentimentsAnalysis',
  serverGetChart : 'http://localhost:8085/api/getChartData',
  serverGPTAnalysis: 'http://localhost:8085/api/gptAnalysis',
}

const options = {
  method: 'GET',
 
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_YAHOO_FINANCE_API_KEY,
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    " Access-Control-Allow-Origin": "*",
  }
};

const fetchStockData = async (symbol) => {
  try {
  const params = {...options,params:{region: 'US',symbol:symbol}, url:api.summary}
  const response = await axios.request(params);
  const data = response.data;
  return data;
  } catch (error) {
    console.error(error);
    return null;
  }

};
const fetchDetails = async (symbol) => {
  try {
  const params = {...options,params:{region: 'US',q:symbol}, url:api.autocomplete}
  const response = await axios.request(params);
  const data = response.data;
  return data;
  } catch (error) {
    console.error(error);
    return null;
  }

};


const fetchSentimentAnalysis =  async (symbol) => {
  openai.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  try {
    const params = {method:"POST",params:{query:symbol}, url:api.serverAnalaysis+`/${symbol}`}
    const response = await axios.request(params);
    const data = response.data;
    return data;
}
  catch (error) {
    console.error(error);
    return null;
  }
}

const fetchChartData = async (symbol,interval,range) => {
  try {
  const params = {...options, url:api.serverGetChart+`/${symbol}/${interval}/${range}`}
  const response = await axios.request(params);
  console.log(response.data)
  const historicalData = response.data.chart.result[0].indicators.quote[0].close.map((value, index) => ({
    date: new Date(response.data.chart.result[0].timestamp[index] * 1000).toLocaleDateString(),
    volume: response.data.chart.result[0].indicators.quote[0].volume[index],
    close: value
  }));
  return historicalData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const askGPT = async (prompt, model, format) => {

  try {


    const response = await axios.post(api.serverGPTAnalysis,{
      prompt:prompt,
      model:model,
      format:format
    } );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch GPT analysis');
  }
};

export default {
  fetchStockData,
  fetchDetails,
  fetchSentimentAnalysis,
  fetchChartData,
  askGPT
};
