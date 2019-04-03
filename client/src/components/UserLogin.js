import React, { Component } from "react";
import { Form, Button, label, Container } from "react-bootstrap";

import { AUTHENTICATE_USER } from "../services/services";
import UserRegister from "./UserRegister";
import { ListGroupItem } from "react-bootstrap";
import { setToken } from "../helpers/authHelper";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

class UserLogin extends Component {
  state = {
    email: "",
    password: "",
    userId: "",
    userName: "",
    isLoggedIn: false,
    isAuthenticated: true,
    path: "",
    token: ""
  };

  handleChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  handleLoginSubmit = event => {
    // event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    AUTHENTICATE_USER(user)
      .then(
        res => {
          if (res.status === 200) {
            const { token, user } = res.data;
            setToken(token);
            this.setState({
              userId: user.id,
              userName: user.name,
              token: token,
              isLoggedIn: true
            });
            this.props.getStatus(
              this.state.userId,
              this.state.userName,
              this.state.isLoggedIn
            );
          }
          NotificationManager.success("Login Success", "Welcome Back!");
        },
        error => {
          if (error) {
            NotificationManager.error(
              "Login Error",
              "Invalid Credentials!",
              2000
            );
          }
        }
      )
      .catch(() => {
        NotificationManager.error(
          "Unexpected Error",
          "Oops seems like something went wrong!",
          2000
        );
        this.setState({ isAuthenticated: false });
      });
  };

  handleSignUp = event => {
    event.preventDefault();
    this.setState({ path: "signUp" });
  };

  render() {
    if (this.state.path === "signUp") {
      return <UserRegister />;
    }
    return (
      <div>
        <Container >
        <ListGroupItem className="trans">
          <label>
            <h2>Login to Your Account Here!</h2>
          </label>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                name="email"
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.handleLoginSubmit}>
              Login
            </Button>
            <Button variant="primary" onClick={this.handleSignUp}>
              Sign Up
            </Button>
          </Form>
        </ListGroupItem>
        </Container>
      </div>
    );
  }
}

export default UserLogin;
