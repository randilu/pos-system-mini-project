import React, { Component } from "react";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Label,
  Alert
} from "reactstrap";
import { AUTHENTICATE_USER } from "../services/services";
import UserRegister from "./UserRegister";
import { ListGroupItem } from "react-bootstrap";
import { setToken } from "../helpers/authHelper";

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
      .then(res => {
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
      })
      .catch(res => {
        console.log(res);
        this.setState({ isAuthenticated: false });
      });
  };

  handleSignUp = event => {
    event.preventDefault();
    this.setState({ path: "signUp" });
  };

  render() {
    console.log(this.state.token);
    if (this.state.path === "signUp") {
      return <UserRegister />;
    }
    return (
      <div>
        <ListGroupItem>
          <Label>
            <h2>Login to Your Account Here!</h2>
          </Label>
          <br />
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend" size="20">
              Enter email
            </InputGroupAddon>
            <Input
              placeholder="Enter email"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </InputGroup>
          <br />
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              Enter Password
            </InputGroupAddon>
            <Input
              placeholder="password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </InputGroup>
          <br />
          {this.state.isAuthenticated ? (
            <Alert color="warning">not logged in</Alert>
          ) : (
            <Alert color="danger">
              Login Failed! Please enter valid credentials!{" "}
            </Alert>
          )}
          <br />
          <Button color="info" onClick={this.handleLoginSubmit}>
            Login
          </Button>
          <Button color="info" onClick={this.handleSignUp}>
            Sign Up
          </Button>
        </ListGroupItem>
      </div>
    );
  }
}

export default UserLogin;
