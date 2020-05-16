import React, { Component } from 'react';
import { Container, Col, Row, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard';
import BookPopup from '../components/BookPopup';
import '../styles/BookList.css';
import { setBookCategoryList } from '../actions/books';

class BookList extends Component {
  constructor(props){
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    this.bookList = props.bookList;
    this.listToRows = this.listToRows.bind(this);
    this.showTitle = this.showTitle.bind(this);
    this.state = {
      booksInRows: [],
      key: undefined
    }
  }

  componentWillMount(){
    let search = window.location.search;
    let category = new URLSearchParams(search).get('category');
    fetch('http://127.0.0.1:8000/book/?matched=false&category=' + category, {})
    .then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      this.handleFetchBookList(data);
    }).then(() => {
      this.listToRows();
    }
    ).catch((err) => {
      console.log('err', err);
    });
  }
  
  listToRows(){
    var toReturn = [];
    var rows = [];
    for(var i = 0; i < this.props.bookList.length; i++){
      if((i + 1) % 3 === 0 || i + 1 === this.props.bookList.length){
        rows.push(this.props.bookList[i]);
        toReturn.push(rows);
        rows = [];
      }else{
        rows.push(this.props.bookList[i]);
      }
    }
    this.setState({booksInRows: toReturn});
  }

  viewClicked (id){
    this.setState({key: id})
    document.getElementById("bookPopup").style.display = "block";
    document.getElementById("bookPopupMask").style.display = "block";
  }

  showTitle(){
    let search = window.location.search;
    return new URLSearchParams(search).get('title');
  }

  render(){
    return (
      <div className="BookList">
        <Container>
        <CardTitle className="cardTitle">{this.showTitle()}</CardTitle>
          {this.state.booksInRows.map((books, key_out) => {
            return (
              <div key={key_out}>
                <Row>
                  {books.map((book, key_in) => {
                    return (
                    <Col xs="6" sm="4" key={key_in}>
                      <BookCard 
                        title={book.name}
                        category={book.category}
                        author={book.author}
                        description={book.description}
                        postedTime={book.postedTime}
                        image={book.image}
                        viewClicked={()=>this.viewClicked(book.id)} />
                    </Col>)
                  })}
                </Row>
                <hr/>
              </div>
            )
          })}
        </Container>
        <BookPopup bookId={this.state.key}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookList: state.books.bookList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchBookList: (data) => {
      dispatch(setBookCategoryList({bookList: data}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
