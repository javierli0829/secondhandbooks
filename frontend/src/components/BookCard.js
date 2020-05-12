import React, {Component} from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/BookCard.css';
import { setBookInfo } from '../actions/books';

class BookCard extends Component {
  constructor(props){
    super(props);
    this.handleOpenBookCard = props.handleOpenBookCard;
    this.viewClicked = this.viewClicked.bind(this);
  }

  viewClicked(){
    console.log(this.props.title,
      this.props.author,
      this.props.category,
      this.props.description,
      this.props.postedTime);
    this.handleOpenBookCard(
      this.props.title,
      this.props.author,
      this.props.category,
      this.props.description,
      this.props.postedTime
    );
  }

  render(){
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle className="cardTitle">{this.props.title}</CardTitle>
            <CardText className="cardText">{this.props.description}</CardText>
            <Button className="viewButton" onClick={this.viewClicked}>View</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenBookCard: (
      name,
      author,
      category,
      description,
      postedTime
    ) => {
      dispatch(setBookInfo(
        {
          name,
          author,
          category,
          description,
          postedTime
        }
      ))
    }
  }
}

export default connect(null, mapDispatchToProps)(BookCard);