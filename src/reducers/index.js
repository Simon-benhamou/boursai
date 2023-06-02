// reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import analysisReducer from './analysisReducer';

const rootReducer = combineReducers({
  analysis: analysisReducer,
});

export default rootReducer;
