import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import {Container} from "reactstrap";
import Orders from "./components/Orders";
import InventoryItems from "./components/InventoryItems";
import UserLogin from "./components/UserLogin";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userName: "",
            isLoggedin: false,

        };
    }

    // getLoginStatus = loginStatus => {
    //   this.setState({ isLoggedin: loginStatus });
    // };
    // getUserId = userId => {
    //   this.setState({ userId: userId });
    //   console.log(this.state.userId);
    // };

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
                    <AppNavbar userName={this.state.userName}/>
                    <Container>
                        <InventoryItems/>
                        <Orders userId={this.state.userId}/>
                    </Container>
                </div>
            );
        }
        return (
            <div className="App">
                <AppNavbar/>
                <Container>
                    {/* <label>
              <h1>{this.state.isLoggedin.toString()}</h1>
            </label> */}
                    <UserLogin getStatus={this.getStatus}/>
                    {/* <ItemModal />
              <InventoryItems />
              <Orders/> */}
                </Container>
            </div>
        );
    }
}

export default App;
