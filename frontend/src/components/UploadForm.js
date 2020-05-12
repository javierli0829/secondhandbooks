import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/UploadForm.css';

function closeForm() {
  document.getElementById("uploadForm").scrollTop = 0;
  document.getElementById("uploadForm").style.display = "none";
  document.getElementById("uploadFormMask").style.display = "none";
}

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: null,
      category: "1",
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

    let bookName = this.state.bookName;
    let category = this.state.category;
    console.log(category);
    let author = this.state.author;
    let description = this.state.description;
    let image = new File([this.state.selectedFile], 'image.jpg');

    var formData = new FormData();
    formData.append('owner', 1);
    formData.append('name', bookName);
    formData.append('category', category);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('image', image);

    fetch('http://127.0.0.1:8000/book/', {
      method: 'POST',
      body: formData,
    })
    .then((res) => {
      res.json();
      closeForm();
    })
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
    this.setState({
      selectedFile: e.target.files[0]
    })
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
                <option value="1">Literature & Ficton</option>
                <option value="2">Comic Book</option>
                <option value="3">Magazine</option>
                <option value="4">Biography & Memoir</option>
                <option value="5">Textbook & Reference Book</option>
                <option value="6">Cookbook</option>
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