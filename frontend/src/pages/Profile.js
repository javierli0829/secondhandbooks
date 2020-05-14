import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Profile.css';
import { Container, Card, CardTitle, CardText, Row, Col } from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
  }

  render() {
    return (
      <div className="Profile">
        <Container>
          <img className="profilePicture" src={this.user.image} alt={this.user.username}/>
          <hr/>
          <Row>
            <Col className="profileCard" sm="12" md={{ size: 6, offset: 3 }}>
              <Card body>
                <CardTitle className="profileCardTitle">{this.user.username}</CardTitle>
                <CardText>Email: {this.user.email}</CardText>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Profile);