import React, { Component } from "react";
import { Container, ListGroup, Button } from "reactstrap";
import Label from "reactstrap/es/Label";
import { GET_ORDERS_BY_USER_ID, CREATE_ORDER } from "../services/services";
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
    this.props.deleteOrder(id);
  };

  calcGrandTotal = items => {
    console.log(items);
    // let sum =0;

    // let sum =items.map((quantity, item) => item.price*quantity);
    // let arr = JSON.parse(items);
    //  let i =arr[1].quantity;
    //  console.log(i);

    // let sum=0;
    // for (let i in items){
    //     let obj = i[0];
    //     console.log(obj.quantity);}
    //     sum+=i.item.price*i.quantity;
    // return sum;
  };

  calcGrandTotal = items => {
    // let sum =0;

    // let sum =items.map((quantity, item) => item.price*quantity);
    // let arr = JSON.parse(items);
    //  let i =arr[1].quantity;
    //  console.log(i);
    console.log(items);
    let sum = 0;
    for (let object in items) {
      console.log(object[0].quantity);
      // let obj = object[0];
      // console.log(obj.quantity);
      // console.log(object.quantity);
      // sum+=object.item.price*object.quantity;
    }
    return sum;
  };

  render() {
    const orders = this.state.orders;
    console.log(this.props.userId);
    return (
      <Container style={{ marginTop: "2rem" }}>
        <Button
          className="button"
          color="primary"
          size="md"
          onClick={this.onCreateClick}
        >
          New Order
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
            />
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default Orders;
