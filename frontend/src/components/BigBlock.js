import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../styles/BigBlock.css';

const BigBlock = (props) => {
  return (
    <div>
      <Jumbotron className="bigBlock">
        <h1 className="display-4">Green Booker</h1>
        <hr/>
        <p className="lead">This is a second-hand book exchange platform. We aim at extending the life of each book.</p>
      </Jumbotron>
    </div>
  );
};

export default BigBlock;