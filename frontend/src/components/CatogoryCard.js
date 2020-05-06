import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import '../styles/CategoryCard.css';

// function fetchClick(){
//   fetch('http://127.0.0.1:8000/user/', {})
//   .then((response) => {
   
//     console.log(response);
    
//     return response.json(); 
//   }).then((data) => {
//   	console.log(data);
//   }).catch((err) => {
//     console.log('err:', err);
// });
// }

const CatogoryCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="cardTitle">{props.title}</CardTitle>
          <CardText className="cardText">Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button className="viewButton" href={"/bookList?category=" + props.to}>View</Button>
        </CardBody>
      </Card>
    </div>
  );
};


export default CatogoryCard;