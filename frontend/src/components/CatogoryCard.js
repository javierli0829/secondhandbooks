import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import '../styles/CategoryCard.css';

const CatogoryCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="cardTitle"><strong>{props.title}</strong></CardTitle>
          <CardText className="cardText">There are some books about {props.title}.</CardText>
          <Button className="viewButton" href={"/bookList?category=" + props.to}>View</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CatogoryCard;