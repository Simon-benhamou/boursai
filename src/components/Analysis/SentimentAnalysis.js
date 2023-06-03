import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSentimentAnalysis } from '../../actions/analysisActions';
import { Carousel, Card, Row, Col ,Accordion, Button } from 'react-bootstrap';
import Spinner from '../../utils/Spinner'
import styled from 'styled-components';

export default function SentimentAnalysis({symbol}) {
  const dispatch = useDispatch();
  const sentimentAnalysis = useSelector((state) => state.analysis?.sentimentAnalysis);

  useEffect(() => {
   dispatch(fetchSentimentAnalysis(symbol));
  }, [dispatch]);

  if (!sentimentAnalysis) {
    return <Spinner/>;
  }

  return (
    <Accordion.Item eventKey="3">
      <Accordion.Header>Sentiment Analysis</Accordion.Header>
      <Accordion.Body>
          <ArticleCarousel articles={sentimentAnalysis?.articles} />
            <p>Grade: {sentimentAnalysis?.grade}</p>
            <p>Score: {sentimentAnalysis?.score}</p>          
      </Accordion.Body>
    </Accordion.Item>

      
  );
}


const ArticleCarousel = ({ articles }) => {
  const chunkSize = 5; // number of articles to display per row
  const articleChunks = articles.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new row
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <Carousel interval={null} indicators={false}>
      {articleChunks.map((articleRow, rowIndex) => (
        <Carousel.Item key={rowIndex}>
          <Row>
            {articleRow.map((article, articleIndex) => (
              <Col key={articleIndex} md={2}>
                <CustomCard className='mx-2 my-3'>
                  <Card.Img variant="top" src={article.urlToImage} />
                  <Card.Body style={{ height: '400px' }}>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text style={{ height: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.description}</Card.Text>
                  </Card.Body>
                </CustomCard>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
const CustomCard = styled(Card)`
  width: 250px;
  height: 400px;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
  overflow: hidden;

`