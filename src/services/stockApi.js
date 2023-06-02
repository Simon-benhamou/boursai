import axios from 'axios';
import * as openai from 'openai';
// Example API function to fetch stock data

const api = {
  summary : 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
  autocomplete: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
  news: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-newslist',
  headlines: 'https://finance.yahoo.com/rss/headline',
  everyNews: 'https://newsapi.org/v2/everything'
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
    const params = {...options,params:{...options.params,q:symbol,apiKey:process.env.REACT_APP_NEWS_API_KEY}, url:api.everyNews}
    const response = await axios.request(params);
    const xml = new window.DOMParser().parseFromString(response.data, 'text/xml');
    const newsArticles = Array.from(xml.querySelectorAll('item')).map((item) => item.querySelector('description').textContent);
    const newsText = newsArticles.join(' ');

    const sentimentAnalysis = await openai.analyze({
      model: 'text-davinci-002',
      prompt: `Sentiment analysis of news articles related to ${symbol}:\n\n${newsText}`,
      temperature: 0.5,
      maxTokens: 60,
      n: 1,
      stop: '\n',
    });

    return sentimentAnalysis.choices[0].text.trim();

}
  catch (error) {
    console.error(error);
    return null;
  }
}

export default {
  fetchStockData,
  fetchDetails,
  fetchSentimentAnalysis
};
