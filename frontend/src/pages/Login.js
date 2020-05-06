import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/Login.css';
import { login } from '../actions/users';

function loginButtonClick(dispatch){
  const account = document.getElementById("accountInput").value;
  const password = document.getElementById("passwordInput").value;
  fetch('http://127.0.0.1:8000/user/?username='+account , {})
  .then((response) => {
   
    console.log(response);
    
    return response.json(); 
  }).then((data) => {
    console.log(data);
    if(data.length === 0){
      alert("No user found.");
    }else{
      if(data[0].password === password){
        // dispatch(login({userId: data.id, usenName: data.username}));
        window.location.href = "/";
      }else{
        alert("Wrong password.");
      }
    }
  }).catch((err) => {
    console.log('err:', err);
  });
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
        <Button onClick={function(){loginButtonClick(props.dispatch)}} className="uploadFormBtn">Login</Button>
      </Form>
    </div>
  );
}

export default connect()(Login);
