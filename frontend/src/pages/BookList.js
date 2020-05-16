import React, { Component } from 'react';
import { Container, Col, Row, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BookCard from '../components/BookCard';
import BookPopup from '../components/BookPopup';
import '../styles/BookList.css';
import { setBookCategoryList } from '../actions/books';

class BookList extends Component {
  constructor(props){
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    // this.bookList = props.bookList;
    this.listToRows = this.listToRows.bind(this);
    this.showTitle = this.showTitle.bind(this);
    this.state = {
      category: undefined,
      bookList: [],
      booksInRows: [],
      key_id: props.key_id
    }
  }

  componentWillMount(){
    let search = window.location.search;
    let category = new URLSearchParams(search).get('category');
    this.setState({category});
    fetch('http://127.0.0.1:8000/book/?matched=false&category=' + category, {})
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({bookList: data});
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
    for(var i = 0; i < this.state.bookList.length; i++){
      if((i + 1) % 3 === 0 || i + 1 === this.state.bookList.length){
        rows.push(this.state.bookList[i]);
        toReturn.push(rows);
        rows = [];
      }else{
        rows.push(this.state.bookList[i]);
      }
    }
    this.setState({booksInRows: toReturn});
  }

  viewClicked (id){
    this.setState({key_id: id}, () => {
      console.log('view click: ' + this.state.key_id);
      document.getElementById("bookPopup").style.display = "block";
      document.getElementById("bookPopupMask").style.display = "block";
    });
  }

  showTitle(){
    switch(this.state.category){
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

  render(){
    return (
      <div className="BookList">
        <Container>
          <div>
            <Jumbotron className="bigBlock">
              <h1 className="display-4">{this.showTitle()}</h1>
              {this.state.booksInRows.length === 0 &&
              <div>
                <hr/>
                <p className="lead">
                  <FontAwesomeIcon color="black" icon={faSearch} /> No book is found in this category. 
                  <a href="/"> Back to homepage.</a>
                </p>
              </div>}
            </Jumbotron>
          </div>
          {this.state.booksInRows.length > 0 && this.state.booksInRows.map((books, key_out) => {
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
        <BookPopup bookId={this.state.key_id} bookList={this.state.bookList}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchBookList: (data) => {
      dispatch(setBookCategoryList({bookList: data}));
    }
  }
}

export default connect(NULL, mapDispatchToProps)(BookList);
