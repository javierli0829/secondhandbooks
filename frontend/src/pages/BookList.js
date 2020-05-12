import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard';
import '../styles/BookList.css';
import { setBookCategoryList } from '../actions/books';

class BookList extends Component {
  constructor(props){
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    this.bookList = props.bookList;
  }

  componentWillMount(){
    let search = window.location.search;
    let category = new URLSearchParams(search).get('category');
    console.log(category);
    fetch('http://127.0.0.1:8000/book/?category=' + category, {})
    .then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      this.handleFetchBookList(data);
    }).catch((err) => {
      console.log('err', err);
    });
  }

  render(){
    console.log(this.state);
    return (
      <div className="BookList">
        <Container>
          {
          this.props.bookList.map((book, key) => {
            return (
              <Row key={key}>
                <Col>
                  <BookCard 
                    title={book.name}
                    category={book.category}
                    author={book.author}
                    description={book.description}
                    postedTime={book.postedTime}
                    image={book.image} />
                </Col>
              </Row>
            );
          })}
          <hr/>
        </Container>
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
