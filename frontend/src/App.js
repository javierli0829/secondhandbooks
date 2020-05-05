import React from 'react';
import './App.css';
import CategoryCard from './components/CatogoryCard'
import BigBlock from './components/BigBlock';
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
            <BigBlock/>
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
        </Container>
        
      </header>
    </div>
  );
}

export default App;
