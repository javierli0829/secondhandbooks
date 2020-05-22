import React, { Component } from 'react';
import { Button, CardImg, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from '@fortawesome/free-solid-svg-icons'
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
    }
    this.type = props.type
    this.user = props.user;
    this.findBook = this.findBook.bind(this);
    this.handleInterested = this.handleInterested.bind(this);
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
      closeBookPopup();
    }).then(() => {
      this.handleUpdateBookInterested(this.user.username);
    })
    .catch(error => console.log(error))
    .then(response => console.log('Success:', response));
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
                <a className="bookPopupOwner" href={"/friend?id=" + this.findBook().owner}>{this.findBook().owner}</a>
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