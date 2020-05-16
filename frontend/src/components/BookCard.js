import React, {Component} from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button, CardImg 
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import '../styles/BookCard.css';

class BookCard extends Component {
  render(){
    return (
      <div>
        <Card>
          {this.props.image ? 
          <CardImg className="bookImage" top src={this.props.image} alt="Card image cap" /> 
          : 
          <div >
            <FontAwesomeIcon className="bookImage fa-5x" color="black" icon={faBook}/>
          </div>}
          <CardBody>
            <CardTitle className="cardTitle">Book name: {this.props.title}</CardTitle>
            <CardText className="cardText">Author: {this.props.author}</CardText>
            <CardText className="cardText">Posted Time: {this.props.postedTime}</CardText>
            <Button className="viewButton" onClick={this.props.viewClicked}>View</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default connect(null)(BookCard);