import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/UploadForm.css';

function closeForm() {
  document.getElementById("uploadForm").scrollTop = 0;
  document.getElementById("uploadForm").style.display = "none";
  document.getElementById("uploadFormMask").style.display = "none";
}

function postBook(e) {
  e.preventDefault();
  const bookName = document.getElementById("bookNameInput").value;
  const category = document.getElementById("categorySelector").value;
  const author = document.getElementById("authorInput").value;
  const description = document.getElementById("descriptionInput").value;
  const peopleInterested = [1];
  fetch('http://127.0.0.1:8000/book/', {
    method: 'POST',
    body: JSON.stringify(
      {
        owner: 1,
        name: bookName,
        category,
        author,
        description,
        peopleInterested
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

const UploadForm = (props) => {
  return (
    <div id="uploadFormMask">
      <div className="uploadFormPopup" id="uploadForm">
        <Form onSubmit={postBook}>
          <h1 className="uploadFormTitle">Upload My Book</h1>
          <FormGroup className="formGroup">
            <Label for="bookName">Book Name</Label>
            <Input type="text" name="bookName" id="bookNameInput" placeholder="Book Name" required/>
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="category">Category</Label>
            <Input type="select" name="category" id="categorySelector" required>
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
            <Input type="file" name="image" id="imageSelector"/>
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="author">Author</Label>
            <Input type="text" name="author" id="authorInput" placeholder="Author" required/>
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="descriptionInput" placeholder="Description" required/>
          </FormGroup>
          <Button className="uploadFormBtn" onClick={closeForm}>Cancel</Button>
          <Button className="uploadFormBtn" onSubmit={postBook}>Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadForm;