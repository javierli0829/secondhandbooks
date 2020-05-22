import React, { Component } from 'react';
import { Container, Jumbotron, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BookPopup from '../components/BookPopup';
import '../styles/MyInterested.css';
import { setBookCategoryList } from '../actions/books';

class MyInterested extends Component {
  constructor(props){
    super(props);
    this.handleFetchBookList = props.handleFetchBookList;
    this.listToRows = this.listToRows.bind(this);
    this.state = {
      bookList: [],
      booksInRows: [],
      key_id: 0,
      loading: true
    };
    this.useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    })
  }

  componentWillMount(){
    fetch('http://127.0.0.1:8000/book/?matched=false', {})
    .then((response) => {
      return response.json();
    }).then((data) => {
      var filteredList = data.filter(book => book.peopleInterested.indexOf(2) !== -1);
      this.setState({ bookList: filteredList, loading: false });
      this.handleFetchBookList(data);
    }).then(() => {
      this.listToRows();
    }).catch((err) => {
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

  returnDate(postedTime){
    var time = new Date(postedTime);
    var date = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();
    return year + ' / ' + month + ' / ' + date;
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
              <h1 className="display-4">My Interest</h1>
              {this.state.booksInRows.length === 0 &&
              <div>
                <hr/>
                <p className="lead">
                  <FontAwesomeIcon color="black" icon={faSearch} /> You don't have any book interested. 
                  <a href="/"> Back to homepage.</a>
                </p>
              </div>}
            </Jumbotron>
          </div>
          {this.state.booksInRows.length !== 0 && 
          <TableContainer component={Paper}>
            <Table className={this.useStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Book name</TableCell>
                  <TableCell align="right">Posted Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.bookList.map((book, key) => (
                  <TableRow key={key} >
                    <TableCell component="th" scope="row">
                      <button className="interestTableBookName" onClick={()=>{this.viewClicked(book.id)}}>{book.name}</button>
                    </TableCell>
                    <TableCell align="right">{this.returnDate(book.postedTime)}</TableCell>
                    <TableCell align="right">{book.matched ? "Matched" : "Waiting"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          }
        </Container>
        <BookPopup bookId={this.state.key_id} bookList={this.state.bookList} type="INTEREST"/>
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

export default connect(null, mapDispatchToProps)(MyInterested);
