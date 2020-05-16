import React, { Component } from 'react';
import { Button, CardImg, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from '@fortawesome/free-solid-svg-icons'
import '../styles/BookPopup.css';

function closeBookPopup() {
  document.getElementById("bookPopup").scrollTop = 0;
  document.getElementById("bookPopup").style.display = "none";
  document.getElementById("bookPopupMask").style.display = "none";
}

class BookPopup extends Component {
  constructor(props) {
    super(props);
    this.bookList = props.bookList;
    this.state = {
      bookId: props.bookId
    }
    this.findBook = this.findBook.bind(this);
  }

  findBook(){
    return this.bookList.find(book => {
      console.log(book.id + ' vs ' + this.state.bookId);
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

  componentWillReceiveProps(nextProps) {
    this.setState({ bookId: nextProps.bookId});
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
    console.log('BookList: ' + this.bookList);
    console.log('book Id: ' + this.state.bookId);
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
              <CardText>Author: {this.findBook().author}</CardText>
              <CardText>Category: {this.showCategory(this.findBook().category)}</CardText>
              <CardText>Description: {this.findBook().description}</CardText>
              <CardText>postedTime: {this.returnDate()}</CardText>
            </div>
          </div>}
          <Button className="bookPopupBtn" onClick={closeBookPopup}>Cancel</Button>
          <Button className="bookPopupBtn" onClick={closeBookPopup}>Interested</Button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookList: state.books.bookList
  }
}

export default connect(mapStateToProps)(BookPopup);