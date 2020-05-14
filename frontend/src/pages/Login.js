import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import '../styles/Login.css';
import { login } from '../actions/user';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasAccount: true
    };
    this.handleLogin = props.handleLogin;
    this.toggleHasAccount = this.toggleHasAccount.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  toggleHasAccount(){
    this.setState(prevState => ({
      hasAccount: !prevState.hasAccount
    }));
  }

  handleSignUp(){
    alert("signup");
  }

  render(){
    return (
      <div className="Login">
        {this.state.hasAccount ? 
          <Container>
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
              <div className="btnContainer">
                <div className="toBeCentered">
                  <Button onClick={this.handleLogin} className="loginFormBtn">Login</Button>
                </div>
              </div>
              <a href="#" onClick={this.toggleHasAccount} className="fakeLink">Don't have an account?</a>
            </Form>
          </Container>
          :
          <Container>
            <Form>
              <h1 className="loginFormTitle">Sign Up</h1>
              <FormGroup className="formGroup">
                <Label for="account">Account</Label>
                <Input type="text" name="account" id="accountInput" placeholder="Account" />
              </FormGroup>
              <FormGroup className="formGroup">
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="passwordInput" />
              </FormGroup>
              <FormGroup className="formGroup">
                <Label for="account">Email</Label>
                <Input type="text" name="email" id="emailInput" placeholder="Email" />
              </FormGroup>
              <FormGroup className="formGroup">
              <Label for="image">Profile Picture</Label>
              <Input type="file" name="image" id="imageSelector" accept="image/*"/>
            </FormGroup>
              <div className="btnContainer">
                <div className="toBeCentered">
                  <Button onClick={this.handleSignUp} className="loginFormBtn">Sign Up</Button>
                </div>
              </div>
              <a href="#" onClick={this.toggleHasAccount} className="fakeLink">Already have an account?</a>
            </Form>
          </Container>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: () => {
      const account = document.getElementById("accountInput").value;
      const password = document.getElementById("passwordInput").value;
      fetch('http://127.0.0.1:8000/user/?username=' + account , {})
      .then((response) => {
      
        console.log(response);
        
        return response.json(); 
      }).then((data) => {
        console.log(data[0]);
        if(data.length === 0){
          alert("No user found.");
        }else{
          if(data[0].password === password){
            dispatch(login(data[0]));
            window.location.href = '/';
          }else{
            alert("Wrong password.");
          }
        }
      }).catch((err) => {
        console.log('err:', err);
      });
    },
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(Login);
