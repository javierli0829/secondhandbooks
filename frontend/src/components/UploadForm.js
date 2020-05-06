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
      <div class="uploadFormPopup" id="myForm">
        <Form class="uploadFormContainer">
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <Button className="btn" onClick={closeForm}>Cancel</Button>
          <Button className="btn">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadForm;