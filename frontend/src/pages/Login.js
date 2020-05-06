import React from 'react';
import '../styles/Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function loginButtonClick(){
  const account = document.getElementById("accountInput").value;
  const password = document.getElementById("passwordInput").value;
  // fetch('http://127.0.0.1:8000/user', {})
  // .then((response) => {
  //   console.log(response);
  //   return response.json(); 
  // }).then((data) => {
  // 	console.log(data);
  // }).catch((err) => {
  //   console.log('err:', err);
  // });
}

function Login(props) {
  return (
    <div className="Login">
      <Form>
        <h1 className="loginFormTitle">Login</h1>
        <FormGroup className="formGroup">
          <Label for="account">Account</Label>
          <Input type="text" name="account" id="accountInput" placeholder="Account" />
        </FormGroup>
        <FormGroup className="formGroup">
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="passwordInput" />
        </FormGroup>
        <Button onClick={loginButtonClick} className="uploadFormBtn">Submit</Button>
      </Form>
    </div>
  );
}

export default Login;
