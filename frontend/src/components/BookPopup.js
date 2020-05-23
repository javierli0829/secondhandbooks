import React, { Component } from 'react';
import { 
  Button, CardImg, CardText,
  Card, CardTitle, CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faLaughWink } from '@fortawesome/free-solid-svg-icons'
import '../styles/BookPopup.css';
import { login } from '../actions/user';

function closeBookPopup() {
  document.getElementById("bookPopup").scrollTop = 0;
  document.getElementById("bookPopup").style.display = "none";
  document.getElementById("bookPopupMask").style.display = "none";
}

class BookPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: props.bookList,
      bookId: props.bookId,
      matchList: {}
    }
    this.type = props.type
    this.user = props.user;
    this.findBook = this.findBook.bind(this);
    this.handleInterested = this.handleInterested.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.handleUpdateBookInterested = props.handleUpdateBookInterested;
  }

  findBook(){
    return this.state.bookList.find(book => {
      return book.id === this.state.bookId;
    });
  }

  returnDate(){
    var time = new Date(this.findBook().postedTime);
    var date = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();
    return year + ' / ' + month + ' / ' + date;
  }

  handleInterested(){
    var newList = this.findBook().peopleInterested;
    newList.push(this.user.id);
    fetch('http://127.0.0.1:8000/book/' + this.state.bookId + '/', {
      method: 'PATCH',
      body: JSON.stringify({
        peopleInterested: newList
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((res) => {
      console.log(res.json());
      // closeBookPopup();
    }).then(() => {
      this.handleUpdateBookInterested(this.user.username);
    })
    .catch(error => console.log(error))
    .then(response => {
      console.log('Success:', response);
    });

    fetch('http://127.0.0.1:8000/match/' + this.user.id + '/' + this.state.bookId, {})
    .then((res) => {
      return res.json(); 
    })
    .then((data) => {
      console.log('possible match: ' + data)
      this.setState({matchList: data});
      if(!(data.matchedBooks && data.matchedBooks.length > 0)){
        closeBookPopup();
      }
    });
  }

  handleMatch(){
    closeBookPopup();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bookId: nextProps.bookId, bookList: nextProps.bookList });
  }

  showCategory(cat){
    switch(cat){
      case '1':
        return 'Literature & Ficton';
      case '2':
        return 'Comic Book';
      case '3':
        return 'Magazine';
      case '4':
        return 'Biography & Memoir';
      case '5':
        return 'Textbook & Reference Book';
      case '6':
        return 'Cookbook';
      default:
        return 'No Category Found';
    }
  }

  render() {
    console.log(this.props.type);
    if(this.state.matchList.matchedBooks && this.state.matchList.matchedBooks.length > 0){
      return (
        <div id="bookPopupMask">
          <div id="bookPopup">
            <FontAwesomeIcon className="winkImage fa-4x" color="#BED905" icon={faLaughWink}/>
            <p className="matchWords"><strong>{this.state.matchList.booksOwner}</strong> is also interested in your following books, choose one to match!</p>
            {this.state.matchList.matchedBooks.map((book, key) => {
              return(
                <Card className="matchCard" key={key}>
                  {book.image ? 
                  <CardImg className="bookImage" top src={book.image} alt="Card image cap" /> 
                  : 
                  <div >
                    <FontAwesomeIcon className="bookImage fa-5x" color="black" icon={faBook}/>
                  </div>}
                  <CardBody className="matchDescription">
                    <CardTitle className="cardTitle"><strong>Book name: </strong>{book.name}</CardTitle>
                    <CardText className="cardText"><strong>Author: </strong>{book.author}</CardText>
                    <CardText className="cardText"><strong>Description: </strong>{book.description}</CardText>
                    <Button className="viewButton" onClick={this.handleMatch}>Match</Button>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </div>
      )
    }
    return (
      <div id="bookPopupMask">
        <div id="bookPopup">
          {this.findBook() && 
          <div>
            <div className="bookTitleImg">
              <h1 className="display-10">{this.findBook().name}</h1>
              {this.findBook().image ? 
              <CardImg className="bookPopupImage" top src={this.findBook().image} alt="Card image cap" /> 
              : 
              <div >
                <FontAwesomeIcon className="bookPopupIcon fa-10x" color="black" icon={faBook}/>
              </div>}
            </div>
            <div className="bookDetails">
              <CardText><strong>Author: </strong>{this.findBook().author}</CardText>
              <CardText><strong>Category: </strong>{this.showCategory(this.findBook().category)}</CardText>
              <CardText><strong>Description: </strong>{this.findBook().description}</CardText>
              <CardText><strong>Posted Time: </strong>{this.returnDate()}</CardText>
              <CardText>
                <strong>Owned By: </strong>
                <a className="bookPopupOwner" href={"/friend?id=" + this.findBook().owner}>{this.findBook().ownerName}</a>
              </CardText>
            </div>
          </div>}
          <Button className="bookPopupBtn" onClick={closeBookPopup}>Cancel</Button>
          {(this.user && this.type !== "INTEREST") && <Button className="bookPopupBtn" onClick={this.handleInterested}>Interested</Button>}
        </div>
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
    handleUpdateBookInterested: (username) => {
      fetch('http://127.0.0.1:8000/user/?username=' + username , {})
      .then((response) => {
      
        console.log(response);
        
        return response.json(); 
      }).then((data) => {
        dispatch(login(data));
      }).catch((err) => {
        console.log('err:', err);
      });
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPopup);