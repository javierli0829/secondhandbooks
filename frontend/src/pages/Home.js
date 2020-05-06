import React from 'react';
import '../styles/Home.css';
import CategoryCard from '../components/CatogoryCard'
import BigBlock from '../components/BigBlock';
import { Container, Row, Col, Button } from 'reactstrap';
import UploadForm from '../components/UploadForm';

function openForm() {
  document.getElementById("uploadForm").style.display = "block";
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
            <CategoryCard title="Literature & Ficton" to="literatureAndFicton"/>
          </Col>
          <Col>
            <CategoryCard title="Comic Book" to="comicBook"/>
          </Col>
          <Col>
            <CategoryCard title="Magazine" to="magazine"/>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <CategoryCard title="Biography & Memoir" to="biographyAndMemoir"/>
          </Col>
          <Col>
            <CategoryCard title="Textbook & Reference Book" to="textbookAndReferenceBook"/>
          </Col>
          <Col>
            <CategoryCard title="Cookbook" to="cookbook"/>
          </Col>
        </Row>
        <hr/>
      </Container>
      <UploadForm/>
    </div>
  );
}

export default Home;
