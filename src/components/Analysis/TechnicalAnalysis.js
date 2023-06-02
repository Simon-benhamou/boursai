import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTechnicalAnalysis } from '../../actions/analysisActions';

export default function TechnicalAnalysis() {
  const dispatch = useDispatch();
  const technicalAnalysis = useSelector((state) => state.analysis?.technicalAnalysis);

  useEffect(() => {
    //dispatch(fetchTechnicalAnalysis());
  }, [dispatch]);

  if (!technicalAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Technical Analysis</h2>
      <p>Grade: {technicalAnalysis?.grade}</p>
      <p>Score: {technicalAnalysis?.score}</p>
      {/* Display chart here */}
    </div>
  );
}