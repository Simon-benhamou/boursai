
const initialState = {
    loading: false,
    stockData: null,
    error: null,
  };
  
  const analysisReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_STOCK_DATA_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_STOCK_DATA_SUCCESS':
        return {
          ...state,
          loading: false,
          stockData: action.payload,
        };
      case 'FETCH_STOCK_DATA_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case "FETCH_SENTIMENT_ANALYSIS_SUCCESS":
          return {
            ...state,
            sentimentAnalysis: action.payload,
            error: null,
          };
        case "FETCH_SENTIMENT_ANALYSIS_FAILURE":
          return {
            ...state,
            sentimentAnalysis: null,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default analysisReducer;
  