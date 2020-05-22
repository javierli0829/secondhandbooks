import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import '../styles/Login.css';
import { login } from '../actions/user';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasAccount: true,
      account: null,
      password: null,
      email: null,
      address: null,
      selectedFile: null
    };
    this.handleLogin = props.handleLogin;
    this.user = props.user;
    this.toggleHasAccount = this.toggleHasAccount.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  toggleHasAccount(){
    this.setState(prevState => ({
      hasAccount: !prevState.hasAccount
    }));
  }

  handleSignUp(e){
    e.preventDefault();

    var formData = new FormData();

    let account = this.state.account;
    let password = this.state.password;
    let email = this.state.email;
    let address = this.state.address;
    let image;
    if(this.state.selectedFile !== null){
      image = new File([this.state.selectedFile], 'image.jpg');
      formData.append('image', image);
    }
    
    formData.append('username', account);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('address', address);

    fetch('http://127.0.0.1:8000/user/', {
      method: 'POST',
      body: formData,
    })
    .then((res) => {
      console.log(res.json());
      this.handleLogin();
    })
    .catch(error => console.log(error))
    .then(response => console.log('Success:', response));
  }

  handleAccountChange(e){
    this.setState({
      account: e.target.value
    })
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleAddressChange(e) {
    this.setState({
      address: e.target.value
    })
  }

  handleFileChange(e) {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  render(){
    if(this.user !== undefined) window.location.href = '/';
    return (
      <div className="Login">
        {this.state.hasAccount ? 
          <Container>
            <Form>
              <h1 className="loginFormTitle">Login</h1>
              <FormGroup className="formGroup">
                <Label for="account">Account</Label>
                <Input type="text" name="account" id="accountInput" placeholder="Account" required/>
              </FormGroup>
              <FormGroup className="formGroup">
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="passwordInput" required/>
              </FormGroup>
              <div className="btnContainer">
                <div className="toBeCentered">
                  <Button onClick={this.handleLogin} className="loginFormBtn">Login</Button>
                </div>
              </div>
              <a href="# " onClick={this.toggleHasAccount} className="fakeLink">Don't have an account?</a>
            </Form>
          </Container>
          :
          <Container>
            <Form onSubmit={this.handleSignUp}>
              <h1 className="loginFormTitle">Sign Up</h1>
              <FormGroup className="formGroup">
                <Label for="account">Account</Label>
                <Input type="text" name="account" id="accountInput" placeholder="Account" onChange={this.handleAccountChange} required/>
              </FormGroup>
              <FormGroup className="formGroup">
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="passwordInput" onChange={this.handlePasswordChange} required/>
              </FormGroup>
              <FormGroup className="formGroup">
                <Label for="account">Email</Label>
                <Input type="text" name="email" id="emailInput" placeholder="Email" onChange={this.handleEmailChange} required/>
              </FormGroup>
              <FormGroup className="formGroup">
                <Label for="account">Address</Label>
                <Input type="text" name="address" id="addressInput" placeholder="Your Mailing Address" onChange={this.handleAddressChange} />
              </FormGroup>
              <FormGroup className="formGroup">
              <Label for="image">Profile Picture</Label>
              <Input type="file" name="image" id="imageSelector" accept="image/*" onChange={this.handleFileChange}/>
            </FormGroup>
              <div className="btnContainer">
                <div className="toBeCentered">
                  <Button className="loginFormBtn">Sign Up</Button>
                </div>
              </div>
              <a href="# " onClick={this.toggleHasAccount} className="fakeLink">Already have an account?</a>
            </Form>
          </Container>
        }
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
    handleLogin: () => {
      const account = document.getElementById("accountInput").value;
      const password = document.getElementById("passwordInput").value;
      fetch('http://127.0.0.1:8000/user/?username=' + account, {})
      .then((response) => {
      
        console.log(response);
        
        return response.json(); 
      }).then((data) => {
        console.log(data);
        //
        data = data.filter((user) => user.username === account);
        //
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
