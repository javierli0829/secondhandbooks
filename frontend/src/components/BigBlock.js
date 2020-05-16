import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../styles/BigBlock.css';

const BigBlock = (props) => {
  return (
    <div>
      <Jumbotron className="bigBlock">
        <h1 className="display-4">Second-hand Books Exchange</h1>
        <hr/>
        <p className="lead">Our goal is to extend the life of books.</p>
      </Jumbotron>
    </div>
  );
};

export default BigBlock;