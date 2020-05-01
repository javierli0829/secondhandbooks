import React from 'react';
import {
  Row, Col, Jumbotron, Container,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette, faMoneyBillWave, faCertificate, faPlus, faUserCircle, faBook, faGrinSquintTears, faTshirt, faGlasses, faUtensils
} from '@fortawesome/free-solid-svg-icons';
import Template from './Templates/Dashboard';

const About = () => (
  <Template pageTitle="Hello World" noPadding>
    <React.Fragment>
      <Container>
        <Row className="mb-2 mt-md-5">
          <Jumbotron className="bg-gray-600 text-white rounded-0">
            <h2>About Second-hand Book Exchange</h2>
            <p style={{textAlign: "justify"}}>
            Our goal is to deal with this problem by extending the life of each book. 
            We are going to build a platform that enables people to exchange second-hand books.
            </p>
            <p style={{textAlign: "justify"}}>
            From then till now, books are one of the best ways for people to receive knowledge, to release themselves from the real world. 
            However, most of the time, a book is just read once and put on the bookshelf for the rest of its life. 
            Bookshelves are overwhelmed with books, where most of them are in good condition. 
            This not only happens to books but also to everything around us, including clothes, designer goods and 3C products. 
            Whereas in this project, we focus on books because the value of a book is not the book itself but the content inside. 
            For all book lovers, after reading a book, they may exchange their books with each other.
            Thus, they can not only share their beloved ones with others but also get some new knowledge from others, which may reduce unnecessary consumption and, at the same time, build a healthy community for book lovers (and of course save their space and money!).
            </p>
          </Jumbotron>
        </Row>
        <Row>
          <Col md="4" className="mt-3">
            <h3>
              <FontAwesomeIcon icon={faBook} />
              {' '}
              Literature & fiction
            </h3>
            <p>Something abot Literature & fiction. Description. Blablablablabla.</p>
            <p><Link to="/articles" className="btn bg-gray-600 text-white">Learn More</Link></p>
          </Col>
          <Col md="4" className="mt-3">
            <h3>
              <FontAwesomeIcon icon={faGrinSquintTears} />
              {' '}
              Comic Book
            </h3>
            <p>Something abot Comic Book. Description. Blablablablabla.</p>
            <p><Link to="/articles" className="btn bg-gray-600 text-white">Learn More</Link></p>
          </Col>
          <Col md="4" className="mt-3">
            <h3>
              <FontAwesomeIcon icon={faTshirt} />
              {' '}
              Magazine
            </h3>
            <p>Something abot Magazine. Description. Blablablablabla.</p>
            <p><Link to="/articles" className="btn bg-gray-600 text-white">Learn More</Link></p>
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mt-3">
            <h3>
              <FontAwesomeIcon icon={faUserCircle} />
              {' '}
              Biography & Memoir
            </h3>
            <p>Something abot Biography & Memoir. Description. Blablablablabla.</p>
            <p><Link to="/articles" className="btn bg-gray-600 text-white">Learn More</Link></p>
          </Col>
          <Col md="4" className="mt-3">
            <h3>
              <FontAwesomeIcon icon={faGlasses} />
              {' '}
              Textbook & Reference Book
            </h3>
            <p>Something abot Textbook & Reference Book. Description. Blablablablabla.</p>
            <p><Link to="/articles" className="btn bg-gray-600 text-white">Learn More</Link></p>
          </Col>
          <Col md="4" className="mt-3">
            <h3>
              <FontAwesomeIcon icon={faUtensils} />
              {' '}
              Cookbook
            </h3>
            <p>Something abot Cookbook. Description. Blablablablabla.</p>
            <p><Link to="/articles" className="btn bg-gray-600 text-white">Learn More</Link></p>
          </Col>
        </Row>
      </Container>

      {/* <hr className="mt-5" /> */}

      <Container>
        <Row className="py-5">
          {/* <Col xs={{ size: 6, offset: 3 }} lg={{ size: 2, offset: 2 }} className="text-center">
            <img className="img-fluid rounded-circle d-inline-block" src="https://avatars0.githubusercontent.com/u/1809236?s=460&v=4" alt="Matt Mcnamee" />
          </Col>
          <Col lg="5" className="mt-4 text-center text-lg-left">
            <h3>I can help</h3>
            <p>
              This repo is a great place to start, but if you'd prefer to sit back and have your new
              project built for you,
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://mcnam.ee">
                get in touch with me directly
              </a>
              {' '}
              and I'll provide a quote.
            </p>
          </Col> */}
        </Row>
      </Container>
    </React.Fragment>
  </Template>
);

export default withRouter(About);
