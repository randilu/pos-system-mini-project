import React, {Component} from "react";
import {InputGroup, Input, InputGroupAddon, Button, Label} from "reactstrap";
import {AUTHENTICATE_USER} from "../services/services";
import UserRegister from "./UserRegister";
import { ListGroupItem } from "react-bootstrap";

class UserLogin extends Component {
    state = {
        email: "",
        password: "",
        userId: "",
        userName: "",
        isLoggedIn: false,
        path:""
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmit = event => {
        // event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        AUTHENTICATE_USER(user).then(res => {
            if (res.status === 200) {
                this.setState({
                    userId: res.data.user.id,
                    userName: res.data.user.name,
                    isLoggedIn: true
                });
                this.props.getStatus(
                    this.state.userId,
                    this.state.userName,
                    this.state.isLoggedIn
                );
            }
        });
    };

    handleSignUp = (event) => {
        event.preventDefault();
        this.setState({path: "signUp"});
    }

    render() {
        if(this.state.path==="signUp"){
            return(
                <UserRegister/>
            )
        }
        return (
            <div>
                <ListGroupItem>
                <Label>
                    <h2>Login to Your Account Here!</h2>
                </Label>
                <br/>
                <br/>
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
                <br/>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Enter Password</InputGroupAddon>
                    <Input
                        placeholder="password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                </InputGroup>
                <br/>
                <br/>
                <Button color="info" onClick={this.handleSubmit}>
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
