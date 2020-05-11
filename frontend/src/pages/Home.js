import React, { Component } from 'react';
import '../styles/Home.css';
import CategoryCard from '../components/CatogoryCard'
import BigBlock from '../components/BigBlock';
import { Container, Row, Col, Button } from 'reactstrap';
import UploadForm from '../components/UploadForm';

function openForm() {
  document.getElementById("uploadForm").style.display = "block";
  document.getElementById("uploadFormMask").style.display = "block";
}

class Home extends Component {
  render(){
    return (
      <div className="Home">
        <Container>
            <BigBlock/>
            <Button onClick={openForm} color="secondary" size="lg" block>Upload My Book</Button>
            <hr/>
          <Row>
            <Col>
              <CategoryCard title="Literature & Ficton" to="1"/>
            </Col>
            <Col>
              <CategoryCard title="Comic Book" to="2"/>
            </Col>
            <Col>
              <CategoryCard title="Magazine" to="3"/>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <CategoryCard title="Biography & Memoir" to="4"/>
            </Col>
            <Col>
              <CategoryCard title="Textbook & Reference Book" to="5"/>
            </Col>
            <Col>
              <CategoryCard title="Cookbook" to="6"/>
            </Col>
          </Row>
          <hr/>
        </Container>
        <UploadForm/>
      </div>
    );
  }
}

export default Home;
