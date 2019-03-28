import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { Row } from "react-bootstrap";
import { removeToken } from "../helpers/authHelper";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleLogOut = () => {
    removeToken();
    this.props.getStatus("", "", false);
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Cake POS</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Row>
                    <NavLink href="#">
                      <b>Hi! {this.props.userName}</b>
                    </NavLink>
                    <NavLink href="#" onClick={this.handleLogOut}>
                      <b>{this.props.logoutLink}</b>
                    </NavLink>
                  </Row>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
