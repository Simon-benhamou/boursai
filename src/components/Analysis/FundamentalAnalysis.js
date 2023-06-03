import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFundamentalAnalysis } from '../../actions/analysisActions';
import Spinner from '../../utils/Spinner'
import { Carousel, Card, Row, Col ,Accordion, Button } from 'react-bootstrap';

export default function FundamentalAnalysis() {
  const dispatch = useDispatch();
  const fundamentalAnalysis = useSelector((state) => state.analysis?.fundamentalAnalysis);

  useEffect(() => {
    //dispatch(fetchFundamentalAnalysis());
  }, [dispatch]);

  // if (!fundamentalAnalysis) {
  //   return <Spinner/>;
  // }

  return (
    <Accordion.Item eventKey="1">
    <Accordion.Header>Fundamental Analysis</Accordion.Header>
    <Accordion.Body>
    <p>Grade: {fundamentalAnalysis?.grade}</p>
      <p>Score: {fundamentalAnalysis?.score}</p>
    </Accordion.Body>
  </Accordion.Item>
   
  
  );
}