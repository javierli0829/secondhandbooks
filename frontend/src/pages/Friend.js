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

class Friend extends Component {
  constructor(props) {
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    this.state = {
      bookList: [],
      user: null,
      loading: true
    }
  }

  componentWillMount(){
    let search = window.location.search;
    let userId = new URLSearchParams(search).get('id');

    fetch('http://127.0.0.1:8000/user/?id=' + userId, {})
    .then((response) => {return response.json()})
    .then((data) => {
    //
    data = data.filter((user) => user.id === parseInt(userId));
    //
      this.setState({user: data[0]});
    }).catch((err) => {
      console.log('err', err);
    })

    fetch('http://127.0.0.1:8000/book/?owner=' + userId , {})
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
          {(this.state.user && this.state.user.image !== null) ?
            <img className="profilePicture" src={this.state.user.image} alt={this.state.user.username}/>
            :
            <FontAwesomeIcon className="headerUserIcon fa-10x" icon={faUser}/>
          }
          <hr/>
          <Row>
            <Col className="profileCard" sm="12" md={{ size: 6, offset: 3 }}>
              <Card body>
                <CardTitle className="profileCardTitle">{this.state.user ? this.state.user.username : 'Name'}</CardTitle>
                <CardText><strong>Email</strong></CardText>
                <ListGroup>
                  <ListGroupItem>{this.state.user ? this.state.user.email : 'Email'}</ListGroupItem>
                </ListGroup>
                <hr/>
                <CardText><strong>My books</strong></CardText>
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friend);