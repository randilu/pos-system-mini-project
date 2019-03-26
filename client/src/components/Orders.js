import React, { Component } from "react";
import { Container, ListGroup, Button } from "reactstrap";
import Label from "reactstrap/es/Label";
import {
  GET_ORDERS_BY_USER_ID,
  CREATE_ORDER,
  DELETE_ORDER
} from "../services/services";
import Order from "./Order";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      userId: ""
    };
  }

  // life cycle method which runs when the component mount
  componentDidMount() {
    const userId = this.props.userId;
    this.setState({ userId: userId });
    GET_ORDERS_BY_USER_ID(userId).then(res => {
      const orders = res.data;
      this.setState({ orders });
    });
  }

  onCreateClick = () => {
    const userId = this.state.userId;
    const orders = this.state.orders;
    CREATE_ORDER({ user_id: userId }).then(res => {
      if (res.status === 200) {
        orders.unshift(res.data);
        this.setState({ orders });
      }
    });
  };

  onDeleteClick = id => {
    DELETE_ORDER(id).then(res => {
      const orders = this.state.orders.filter(order => order._id !== id);
      this.setState({ orders });
    });
  };

  render() {
    const orders = this.state.orders;
    console.log(this.props.userId);
    return (
      <Container style={{ marginTop: "2rem" }}>
        <Button
          className="btn-create"
          color="primary"
          size="md"
          onClick={this.onCreateClick}
        >
          New Order +
        </Button>
        <br />
        <br />
        <Label>Current Orders</Label>
        <ListGroup className="order-list">
          {orders.map(({ _id, user_id, items, status, grand_total }) => (
            <Order
              key={_id}
              orderId={_id}
              userId={user_id}
              items={items}
              orderStatus={status}
              grandTotal={grand_total}
              onRemoveOrder={this.onDeleteClick}
            />
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default Orders;
