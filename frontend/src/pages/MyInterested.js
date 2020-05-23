import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
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
import { login } from '../actions/user';
import '../styles/MyInterested.css';

class MyInterested extends Component {
  constructor(props){
    super(props);
    this.listToRows = this.listToRows.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.user = props.user;
    this.handleUpdateBookInterested = props.handleUpdateBookInterested;
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
    if(this.user === undefined) window.location.href = '/';
    this.handleUpdateBookInterested(this.user.username);
    this.listToRows();
  }

  listToRows(){
    var toReturn = [];
    var rows = [];
    for(var i = 0; i < this.user.bookInterested.length; i++){
      if((i + 1) % 3 === 0 || i + 1 === this.user.bookInterested.length){
        rows.push(this.user.bookInterested.length[i]);
        toReturn.push(rows);
        rows = [];
      }else{
        rows.push(this.user.bookInterested.length[i]);
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

  checkStatus(matchedWith){
    console.log('match status: ', matchedWith);
    if(matchedWith.length === 0) return 'Waiting for Response';
    if(this.user.booksOwned.indexOf(matchedWith[0]) !== -1){
      return 'Matched';
    }else{
      return 'Failed to Match';
    }
  }

  render(){
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
                {this.user.bookInterested.map((book, key) => (
                  <TableRow key={key} >
                    <TableCell component="th" scope="row">
                      <button className="interestTableBookName" onClick={()=>{this.viewClicked(book.id)}}>{book.name}</button>
                    </TableCell>
                    <TableCell align="right">{this.returnDate(book.postedTime)}</TableCell>
                    <TableCell align="right">{this.checkStatus(book.matchedWith)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          }
        </Container>
        <BookPopup bookId={this.state.key_id} bookList={this.user.bookInterested} type="INTEREST"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyInterested);
