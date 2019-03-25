import React, { Component } from "react";
import {
  Container,
  Button,
  ListGroupItem,
  Row,
  Col,
  Table,
  Label,
  Collapse
} from "reactstrap";
import SelectItemDropdown from "./SelectItemDropdown";
import { UPDATE_ORDER } from "../services/services";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      collapse: false,
      orderStatus: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    console.log("did mount");
    const items = this.props.items;
    const orderStatus = this.props.orderStatus;
    this.setState({ items: items, orderStatus: orderStatus });
  }

  toggle(event) {
    event.preventDefault();
    this.setState(state => ({ collapse: !state.collapse }));
  }

  onServeClick = id => {
    if (this.state.orderStatus !== "Served") {
      console.log(id);
      const items = this.state.items;
      const orderStatus = "Served";
      UPDATE_ORDER(id, { status: orderStatus, items: { items } }).then(res => {
        console.log(res.data);
        const orderStatus = res.data.status;
        console.log(orderStatus);
        this.setState({ orderStatus });
      });
    }
  };

  getOrderStatus = items => {
    this.setState({ items });
  };

  onRemoveItem = id => {
    const items = this.state.items.filter(item => item._id !== id);
    UPDATE_ORDER(this.props.orderId, { items }).then(() =>
      this.setState({ items })
    );
  };

  onQtyIncrement = id => {
    const items = this.state.items;
    const item = items.find(item => item._id === id);
    if (item) {
      ++item.quantity;
    }
    const modifedItems = items.filter(item => item._id !== id);
    modifedItems.push(item);
    UPDATE_ORDER(this.props.orderId, modifedItems, this.state.orderStatus).then(
      () => this.setState({ items })
    );
  };

  onQtyDecrement = id => {};

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

  render() {
    console.log("rendered");
    const id = this.props.orderId;
    const userId = this.props.userId;
    const items = this.state.items;
    const orderStatus = this.state.orderStatus;
    const disable =
      this.state.orderStatus === "Served" ? "disable-element" : "";
    return (
      <Container>
        <ListGroupItem key={id}>
          <Row>
            <Col>
              <Button
                className="button"
                color="success"
                size="md"
                onClick={this.onServeClick.bind(this, id)}
              >
                Serve Order
              </Button>
            </Col>
            <Col>
              <Button color="primary">{orderStatus}</Button>
            </Col>
            <Col>
              <div className={disable}>
                <SelectItemDropdown
                  userId={userId}
                  orderId={id}
                  getOrderStatus={this.getOrderStatus}
                />
              </div>
            </Col>
            <Col>
              <Button color="info" onClick={this.toggle}>
                View Details
              </Button>
            </Col>
          </Row>
          <Collapse isOpen={this.state.collapse}>
            <Row>
              <Table key={id} style={{ margin: "0.5rem" }}>
                <thead>
                  <tr>
                    <th />
                    <th>
                      {" "}
                      <Label>Item</Label>
                    </th>
                    <th>
                      <Label>Qty</Label>
                    </th>
                    <th>
                      <Label>Cost</Label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(({ _id, item, quantity }) => (
                    <tr key={_id}>
                      <td>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="md"
                          onClick={this.onRemoveItem.bind(this, _id)}
                        >
                          Remove
                        </Button>
                      </td>
                      <td>
                        <Label>{item.item_name}</Label>{" "}
                      </td>
                      <td>
                        {" "}
                        <Label>
                          {quantity}
                          <Button onClick={this.onQtyIncrement.bind(this, _id)}>
                            +
                          </Button>
                          <Button onClick={this.onQtyDecrement.bind(this, _id)}>
                            -
                          </Button>
                        </Label>
                      </td>
                      <td>
                        <Label>${item.price * quantity}</Label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Collapse>
        </ListGroupItem>
      </Container>
    );
  }
}

export default Order;
