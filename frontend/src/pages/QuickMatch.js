import React, { Component } from 'react';
import '../styles/QuickMatch.css';
import CategoryCard from '../components/CatogoryCard'
import { Container, Row, Col } from 'reactstrap';

class Home extends Component {
  render(){
    return (
      <div className="QuickMatch">
        <Container>
          <Row>
            <Col>
              <CategoryCard title="Literature & Ficton" />
            </Col>
            <Col>
              <CategoryCard title="Comic Book" />
            </Col>
            <Col>
              <CategoryCard title="Magazine" />
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <CategoryCard title="Biography & Memoir" />
            </Col>
            <Col>
              <CategoryCard title="Textbook & Reference Book" />
            </Col>
            <Col>
              <CategoryCard title="Cookbook" />
            </Col>
          </Row>
          <hr/>
        </Container>
      </div>
    );
  }
}

export default Home;
