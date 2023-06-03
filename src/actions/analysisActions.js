// actions/analysisActions.js

import stockApi from '../services/stockApi';

export const fetchStockData = (symbol) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_STOCK_DATA_REQUEST' });

      const stockData = await stockApi.fetchStockData(symbol);

      dispatch({
        type: 'FETCH_STOCK_DATA_SUCCESS',
        payload: stockData,
      });
    } catch (error) {
      dispatch({ type: 'FETCH_STOCK_DATA_FAILURE', payload: error.message });
    }
  };
};

export const fetchRiskAnalysis = () => async (dispatch) => {
  // try {
  //   const res = await stockApi.fetchRiskAnalysis(symbol);
  //   dispatch({ type: "FETCH_RISK_ANALYSIS_SUCCESS", payload: res });
  // } catch (error) {
  //   dispatch({ type: "FETCH_RISK_ANALYSIS_FAILURE", payload: error.message });
  // }
};
export const fetchFundamentalAnalysis = () => async (dispatch) => {
  // try {
  //   const res = await stockApi.fetchFundamentalAnalysis(symbol);
  //   dispatch({ type: "FETCH_FUNDAMENTAL_ANALYSIS_SUCCESS", payload: res });
  // } catch (error) {
  //   dispatch({ type: "FETCH_FUNDAMENTAL_ANALYSIS_FAILURE", payload: error.message });
  // }
};
export const fetchSentimentAnalysis = (symbol) => async (dispatch) => {
  try {
    const res =  await stockApi.fetchSentimentAnalysis(symbol);
    dispatch({ type: "FETCH_SENTIMENT_ANALYSIS_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "FETCH_SENTIMENT_ANALYSIS_FAILURE", payload: error.message });
  }
};
export const fetchTechnicalAnalysis = () => async (dispatch) => {
  // try {
  //   const res = await stockApi.fetchSentimentAnalysis(symbol);
  //   dispatch({ type: "FETCH_TECHNICAL_ANALYSIS_SUCCESS", payload: res });
  // } catch (error) {
  //   dispatch({ type: "FETCH_TECHNICAL_ANALYSIS_FAILURE", payload: error.message });
  // }
};

export const fetchChartData = (symbol,interval,range) => async (dispatch) => {
  try {
    const res = await stockApi.fetchChartData(symbol,interval,range);
    dispatch({ type: "FETCH_CHART_DATA_SUCCESS", payload: res });
  } catch (error) {
    dispatch({ type: "FETCH_CHART_DATA_FAILURE", payload: error.message });
  }
}