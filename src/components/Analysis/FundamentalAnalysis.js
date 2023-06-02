import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFundamentalAnalysis } from '../../actions/analysisActions';

export default function FundamentalAnalysis() {
  const dispatch = useDispatch();
  const fundamentalAnalysis = useSelector((state) => state.analysis?.fundamentalAnalysis);

  useEffect(() => {
    //dispatch(fetchFundamentalAnalysis());
  }, [dispatch]);

  if (!fundamentalAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Fundamental Analysis</h2>
      <p>Grade: {fundamentalAnalysis?.grade}</p>
      <p>Score: {fundamentalAnalysis?.score}</p>
      {/* Display chart here */}
    </div>
  );
}