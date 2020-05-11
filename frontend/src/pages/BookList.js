import React, { Component } from 'react';
import '../styles/BookList.css';
import CategoryCard from '../components/CatogoryCard'
import { Container, Row, Col } from 'reactstrap';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookList: []
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
    }).catch((err) => {
      console.log('err', err);
    });
  }
  render(){
    return (
      <div className="BookList">
        <Container>
          <hr/>
        </Container>
      </div>
    );
  }
}

export default BookList;
