import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { Container } from "reactstrap";
import Orders from "./components/Orders";
import InventoryItems from "./components/InventoryItems";
import UserLogin from "./components/UserLogin";
import { NotificationContainer } from "react-notifications";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userName: "",
      isLoggedin: false
    };
  }

  getStatus = (userId, userName, loginStatus) => {
    this.setState({
      userId: userId,
      userName: userName,
      isLoggedin: loginStatus
    });
  };

  render() {
    if (this.state.isLoggedin) {
      return (
        <div>
          <AppNavbar
            userName={this.state.userName}
            logoutLink="Logout"
            getStatus={this.getStatus}
          />
          <Container>
            <InventoryItems />
            <Orders userId={this.state.userId} />
          </Container>
          <NotificationContainer />
        </div>
      );
    }
    return (
      <div>
        <div>
          <AppNavbar />
          <Container>
            <UserLogin getStatus={this.getStatus} />
          </Container>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
