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
          <CardTitle className="cardTitle">{props.title}</CardTitle>
          <CardText className="cardText">Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="viewButton" href={"/bookList?category=" + props.to + "&title=" + props.title}>View</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CatogoryCard;