import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/UploadForm.css';

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("uploadFormMask").style.display = "none";
}

const UploadForm = (props) => {
  return (
    <div id="uploadFormMask">
      <div className="uploadFormPopup" id="myForm">
        <Form>
          <h1 className="uploadFormTitle">Upload My Book</h1>
          <FormGroup className="formGroup">
            <Label for="category">Category</Label>
            <Input type="select" name="category" id="categorySelector">
              <option>Literature & Ficton</option>
              <option>Comic Book</option>
              <option>Magazine</option>
              <option>Biography & Memoir</option>
              <option>Textbook & Reference Book</option>
              <option>Cookbook</option>
            </Input>
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="bookName">Book Name</Label>
            <Input type="text" name="bookName" id="bookNameInput" placeholder="Book Name" />
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="image">Image</Label>
            <Input type="file" name="image" id="imageSelector" />
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="author">Author</Label>
            <Input type="text" name="author" id="authorInput" placeholder="Author" />
          </FormGroup>
          <FormGroup className="formGroup">
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="descriptionInput" placeholder="Description" />
          </FormGroup>
          <Button className="uploadFormBtn" onClick={closeForm}>Cancel</Button>
          <Button className="uploadFormBtn">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadForm;