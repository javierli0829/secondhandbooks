import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BookCard from '../components/BookCard';
import '../styles/BookList.css';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookList: [],
      bookListLength: 0
    };
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
      console.log(data);
      this.setState({
        bookList: data,
        bookListLength: data.length
      })
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
          this.state.bookList.map((book, key) => {
            console.log(book);
            if(key % 3 === 0){
              return (
                <Col key={key}>
                  <BookCard 
                    title={book.name}
                    category={book.category}
                    author={book.author}
                    description={book.description}
                    postedTime={book.postedTime} />
                </Col>
              );
            }else{
              return (
                <Col key={key}>
                  <BookCard 
                    title={book.name}
                    category={book.category}
                    author={book.author}
                    description={book.description}
                    postedTime={book.postedTime} />
                </Col>
              );
            }
          })}
          <hr/>
        </Container>
      </div>
    );
  }
}

export default BookList;
