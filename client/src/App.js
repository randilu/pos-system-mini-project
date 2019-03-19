import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import InventoryItems from "./components/InventoryItems";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import Orders from "./components/Orders";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <InventoryItems />
            <Orders/>
          </Container>
        </div>
      </Provider>
    );
  }
}
export default App;
