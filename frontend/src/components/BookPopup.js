import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
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
    this.bookId = props.bookId;
  }

  render() {
    return (
      <div id="bookPopupMask">
        <div id="bookPopup">
          {console.log(this.props.bookId)}
          <Button className="bookPopupBtn" onClick={closeBookPopup}>Cancel</Button>
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