import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { Container } from "reactstrap";
import Orders from "./components/Orders";
import InventoryItems from "./components/InventoryItems";
import UserLogin from "./components/UserLogin";

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
        <div className="App">
          <Container>
            <AppNavbar
              userName={this.state.userName}
              logoutLink="logout"
              getStatus={this.getStatus}
            />

            <InventoryItems />
            <Orders userId={this.state.userId} />
          </Container>
        </div>
      );
    }
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <UserLogin getStatus={this.getStatus} />
        </Container>
      </div>
    );
  }
}

export default App;
