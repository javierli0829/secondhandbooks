import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/UploadForm.css';
import axios from 'axios';

function closeForm() {
  document.getElementById("uploadForm").scrollTop = 0;
  document.getElementById("uploadForm").style.display = "none";
  document.getElementById("uploadFormMask").style.display = "none";
}

// function postBook(e) {
//   e.preventDefault();

//   const data = new FormData();
//   data.append('owner', 1);
//   data.append('name', this.state.bookName);
//   data.append('category', this.state.category);
//   data.append('image', this.state.selectedFile);
//   data.append('authoe', this.state.author);
//   data.append('description', this.state.description);

//   axios.post('http://127.0.0.1:8000/book/', data, {}).then(res => console.log(res));

//   // const bookName = document.getElementById("bookNameInput").value;
//   // const category = document.getElementById("categorySelector").value;
//   // const author = document.getElementById("authorInput").value;
//   // const description = document.getElementById("descriptionInput").value;
//   // const imagePath = document.getElementById("imageSelector").value;
//   // console.log("img: " + imagePath);
//   // fetch('http://127.0.0.1:8000/book/', {
//   //   method: 'POST',
//   //   body: JSON.stringify(
//   //     {
//   //       owner: 1,
//   //       name: bookName,
//   //       category,
//   //       author,
//   //       description,
//   //       // image: imagePath
//   //     }
//   //   ),
//   //   headers: new Headers({
//   //     'Content-Type': 'application/json'
//   //   })
//   // })
//   // .then((res) => res.json())
//   // .catch(error => console.log(error))
//   // .then(response => console.log('Success:', response));
// }

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: null,
      category: "Literature & Ficton",
      selectedFile: null,
      author: null,
      description: null
    };
    this.postBook = this.postBook.bind(this);
    this.handleBookNameChange = this.handleBookNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  postBook(e) {
    e.preventDefault();
  
    // const data = new FormData();
    // data.append('owner', 1);
    // data.append('name', this.state.bookName);
    // data.append('category', this.state.category);
    // data.append('image', this.state.selectedFile);
    // data.append('authoe', this.state.author);
    // data.append('description', this.state.description);
    // console.log(data);
  
    // axios.post('http://127.0.0.1:8000/book/', data, {}).then(res => console.log(res));
  
    const bookName = this.state.bookName;
    const category = this.state.category;
    const author = this.state.author;
    const description = this.state.description;
    const imagePath = this.state.selectedFile;
    console.log("img: " + imagePath);
    fetch('http://127.0.0.1:8000/book/', {
      method: 'POST',
      body: JSON.stringify(
        {
          owner: 1,
          name: bookName,
          category,
          author,
          description,
          // image: imagePath
        }
      ),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((res) => res.json())
    .catch(error => console.log(error))
    .then(response => console.log('Success:', response));
  }

  handleBookNameChange(e) {
    this.setState({
      bookName: e.target.value,
    });
  }

  handleCategoryChange(e) {
    this.setState({
      category: e.target.value,
    });
  }

  handleFileChange(e) {
    const reader = new FileReader();
    this.setState({
      selectedFile: reader.readAsDataURL(e.target.files[0]),
    });
  }

  handleAuthorChange(e) {
    this.setState({
      author: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }
  
  render() {
    return (
      <div id="uploadFormMask">
        <div className="uploadFormPopup" id="uploadForm">
          <Form onSubmit={this.postBook}>
            <h1 className="uploadFormTitle">Upload My Book</h1>
            <FormGroup className="formGroup">
              <Label for="bookName">Book Name</Label>
              <Input type="text" name="bookName" id="bookNameInput" placeholder="Book Name" onChange={this.handleBookNameChange} required/>
            </FormGroup>
            <FormGroup className="formGroup">
              <Label for="category">Category</Label>
              <Input type="select" name="category" id="categorySelector" onChange={this.handleCategoryChange} required>
                <option>Literature & Ficton</option>
                <option>Comic Book</option>
                <option>Magazine</option>
                <option>Biography & Memoir</option>
                <option>Textbook & Reference Book</option>
                <option>Cookbook</option>
              </Input>
            </FormGroup>
            <FormGroup className="formGroup">
              <Label for="image">Image</Label>
              <Input type="file" name="image" id="imageSelector" accept="image/*" onChange={this.handleFileChange}/>
            </FormGroup>
            <FormGroup className="formGroup">
              <Label for="author">Author</Label>
              <Input type="text" name="author" id="authorInput" placeholder="Author" onChange={this.handleAuthorChange} required/>
            </FormGroup>
            <FormGroup className="formGroup">
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="descriptionInput" placeholder="Description" onChange={this.handleDescriptionChange} required/>
            </FormGroup>
            <Button className="uploadFormBtn" onClick={closeForm}>Cancel</Button>
            <Button className="uploadFormBtn">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default UploadForm;