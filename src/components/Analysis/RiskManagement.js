import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRiskAnalysis } from '../../actions/analysisActions';
import Spinner from '../../utils/Spinner'
import { Carousel, Card, Row, Col ,Accordion, Button } from 'react-bootstrap';

export default function RiskManagement() {
  const dispatch = useDispatch();
  const riskAnalysis = useSelector((state) => state.analysis?.riskAnalysis);

  useEffect(() => {
    //dispatch(fetchRiskAnalysis());
  }, [dispatch]);

  // if (!riskAnalysis) {
  //   return <Spinner/>;
  // }

  return (
     <Accordion.Item eventKey="3">
     <Accordion.Header>Risk Analysis</Accordion.Header>
     <Accordion.Body>
     <p>Grade: {riskAnalysis?.grade}</p>
      <p>Score: {riskAnalysis?.score}</p>
     </Accordion.Body>
   </Accordion.Item>
  );
}