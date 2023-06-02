import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRiskAnalysis } from '../../actions/analysisActions';

export default function RiskManagement() {
  const dispatch = useDispatch();
  const riskAnalysis = useSelector((state) => state.analysis?.riskAnalysis);

  useEffect(() => {
    //dispatch(fetchRiskAnalysis());
  }, [dispatch]);

  if (!riskAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Risk Analysis</h2>
      <p>Grade: {riskAnalysis.grade}</p>
      <p>Score: {riskAnalysis.score}</p>
      {/* Display chart here */}
    </div>
  );
}