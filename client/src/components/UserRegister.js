import React, { Component } from "react";
import {
  Form,
  Col,
  Button,
  InputGroup,
  Container,
  ListGroupItem,
} from "react-bootstrap";
import {Label} from "reactstrap"
import { CREATE_USER } from "../services/services";
import UserLogin from "./UserLogin";
import AlertDismissible from "./AlertDismissable";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      validated: false,
      registerStatus: false
    };
  }

  handleChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.firstName.concat(this.state.lastName)
    };
    CREATE_USER(user)
      .then(res => {
        if (res.status === 200) {
          console.log("successful registratuon");
          this.setState({ registerStatus: true });
        } else {
          console.log("registration failed");
        }
      })
      .catch(console.log("error occured while registering"));
  };

  render() {
    const { validated } = this.state;
    if (this.state.registerStatus) {
      return (
        <Container>
          <AlertDismissible success={this.state.registerStatus} />
          <UserLogin />
        </Container>
      );
    }
    return (
      <Container>
        <ListGroupItem style={{scale: "center"}} >
        <Label><h2>Sign Up Here!</h2></Label>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                placeholder="enter your first name"
                onChange={this.handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="enter your last name"
                name="lastName"
                onChange={this.handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required
                  type="email"
                  placeholder="enter your email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter an email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="enter a password"
                name="password"
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
        </ListGroupItem>
      </Container>
    );
  }
}

export default UserRegister;
