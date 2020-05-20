import React, { Component } from 'react';
import {
  Container, Col, Row, Jumbotron, Spinner,
  Form, FormGroup, Input, Button
} from 'reactstrap';
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
    this.listToRows = this.listToRows.bind(this);
    this.showTitle = this.showTitle.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      category: undefined,
      bookList: [],
      searchResult: [],
      booksInRows: [],
      key_id: props.key_id,
      loading: true,
      search: undefined
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
      this.setState({ bookList: data, loading: false });
      this.handleFetchBookList(data);
    }).then(() => {
      this.listToRows();
    }
    ).catch((err) => {
      console.log('err', err);
    });
  }

  listToRows(mode){
    var toReturn = [];
    var rows = [];
    var i;
    if(mode === 1){
      console.log("search mode");
      for(i = 0; i < this.state.searchResult.length; i++){
        if((i + 1) % 3 === 0 || i + 1 === this.state.searchResult.length){
          rows.push(this.state.searchResult[i]);
          toReturn.push(rows);
          rows = [];
        }else{
          rows.push(this.state.searchResult[i]);
        }
      }
      this.setState({booksInRows: toReturn});
    }else{
      for(i = 0; i < this.state.bookList.length; i++){
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

  searchBook(e){
    e.preventDefault();
    if(this.state.search === undefined){
      // alert("Please enter book name");
    }else{
      this.setState({
        searchResult: this.state.bookList.filter(book => (book.name.toUpperCase().includes(this.state.search.toUpperCase()) || book.description.toUpperCase().includes(this.state.search.toUpperCase())))
      }, () => {this.listToRows(1)});
    }
  }

  handleSearchChange(e){
    this.setState({
      search: e.target.value
    })
  }

  render(){
    if(this.state.loading){
      return (
        <div className="BookList">
          <Container>
            <Spinner color="dark" />
          </Container>
        </div>
      )
    }
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
          <Form className="searchBarForm" onClick={this.searchBook}>
              <FormGroup className="searchBar">
                <Input type="search" name="search" id="search" placeholder="what book are you looking for?" onChange={this.handleSearchChange} />
                <Button className="searchBarBtn">Search</Button>
              </FormGroup>
            </Form>
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

export default connect(null, mapDispatchToProps)(BookList);
