import React from 'react';
import '../styles/Home.css';
import CategoryCard from '../components/CatogoryCard'
import BigBlock from '../components/BigBlock';
import { Container, Row, Col, Button } from 'reactstrap';
import UploadForm from '../components/UploadForm';

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("uploadFormMask").style.display = "block";
}

function Home() {
  return (
    <div className="Home">
      <Container>
          <BigBlock/>
          <Button onClick={openForm} color="secondary" size="lg" block>Upload My Book</Button>
          <hr/>
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
      <UploadForm/>
    </div>
  );
}

export default Home;
