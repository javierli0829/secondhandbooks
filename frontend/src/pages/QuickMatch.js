import React, { Component } from 'react';
import { Container, Col, Row, Jumbotron, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BookCard from '../components/BookCard';
import BookPopup from '../components/BookPopup';
import '../styles/QuickMatch.css';
import { setBookCategoryList } from '../actions/books';

class QuickMatch extends Component {
  constructor(props){
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    this.listToRows = this.listToRows.bind(this);
    this.state = {
      bookList: [],
      booksInRows: [],
      key_id: props.key_id,
      loading: true
    }
  }

  componentWillMount(){
    fetch('http://127.0.0.1:8000/book/?matched=false', {})
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
              <h1 className="display-4">Quick Match</h1>
              {this.state.booksInRows.length === 0 &&
              <div>
                <hr/>
                <p className="lead">
                  <FontAwesomeIcon color="black" icon={faSearch} /> None is interested in your books yet. 
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

export default connect(null, mapDispatchToProps)(QuickMatch);
