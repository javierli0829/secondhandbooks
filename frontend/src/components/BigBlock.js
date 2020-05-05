import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../styles/BigBlock.css';

const BigBlock = (props) => {
  return (
    <div>
      <Jumbotron className="bigBlock">
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      </Jumbotron>
    </div>
  );
};

export default BigBlock;