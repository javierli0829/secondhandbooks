import React from 'react';
import '../styles/Home.css';
import CategoryCard from '../components/CatogoryCard'
import BigBlock from '../components/BigBlock';
import { Container, Row, Col, Button } from 'reactstrap';

function Home() {
  return (
    <div className="Home">
        <Container>
            <BigBlock/>
            <Button color="secondary" size="lg" block>Upload My Book</Button>
            <hr/>
          <Row>
            <Col>
              <CategoryCard title="One" />
            </Col>
            <Col>
              <CategoryCard title="Two" />
            </Col>
            <Col>
              <CategoryCard title="Three" />
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <CategoryCard title="Four" />
            </Col>
            <Col>
              <CategoryCard title="Five" />
            </Col>
            <Col> </Col>
          </Row>
          <hr/>
        </Container>
    </div>
  );
}

export default Home;
