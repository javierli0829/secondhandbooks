import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Profile.css';
import
{
  Container, Card, CardTitle, 
  CardText, Row, Col,
  ListGroup, ListGroupItem, Spinner
} 
from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { setBookCategoryList } from '../actions/books';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    this.user = props.user;
    this.state = {
      bookList: [],
      loading: true
    }
  }

  componentWillMount(){
    if(this.user === undefined) window.location.href = '/';
    fetch('http://127.0.0.1:8000/book/?owner=' + this.user.id, {})
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ bookList: data, loading: false });
      this.handleFetchBookList(data);
    }).then(() => {
      this.listToRows();
    }
    ).catch((err) => {
      console.log('err', err);
    });
  }

  render() {
    if(this.state.loading){
      return (
        <div className="BookList">
          <Container>
            <Spinner color="dark" />
          </Container>
        </div>
      )
    }
    console.log(this.state.bookList);
    return (
      <div className="Profile">
        <Container className="ProfileContainer">
          {this.user.image !== null ?
            <img className="profilePicture" src={this.user.image} alt={this.user.username}/>
            :
            <FontAwesomeIcon className="headerUserIcon fa-10x" icon={faUser}/>
          }
          <hr/>
          <Row>
            <Col className="profileCard" sm="12" md={{ size: 6, offset: 3 }}>
              <Card body>
                <CardTitle className="profileCardTitle">{this.user.username}</CardTitle>
                <CardText>Email</CardText>
                <ListGroup>
                  <ListGroupItem>{this.user.email}</ListGroupItem>
                </ListGroup>
                <hr/>
                <CardText>My books</CardText>
                <ListGroup >
                  {this.state.bookList.map((book, key) => {
                    return (
                    <ListGroupItem className="userBookList" key={key}>
                      {console.log(book.name)}
                      {book.name}
                    </ListGroupItem>)
                  })}
                </ListGroup>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchBookList: (data) => {
      dispatch(setBookCategoryList({bookList: data}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);