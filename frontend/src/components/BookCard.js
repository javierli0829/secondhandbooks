import React, {Component} from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button, CardImg 
} from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/BookCard.css';

class BookCard extends Component {
  render(){
    return (
      <div>
        <Card>
          {this.props.image && <CardImg top width="50%" src={this.props.image} alt="Card image cap" />}
          <CardBody>
            <CardTitle className="cardTitle">Book name: {this.props.title}</CardTitle>
            <CardText className="cardText">Author: {this.props.author}</CardText>
            <CardText className="cardText">Description: {this.props.description}</CardText>
            <CardText className="cardText">Posted Time: {this.props.postedTime}</CardText>
            <Button className="viewButton" onClick={this.viewClicked}>View</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default connect(null)(BookCard);