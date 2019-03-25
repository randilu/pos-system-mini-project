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
      orderStatus: "",
      grandTotal: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    console.log("did mount");
    const items = this.props.items;
    const orderStatus = this.props.orderStatus;
    const grandTotal = this.props.grandTotal;
    console.log("GT=" + grandTotal);
    this.setState({
      items: items,
      orderStatus: orderStatus,
      grandTotal: grandTotal
    });
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
    const order_status = this.state.orderStatus;
    const items = this.state.items.filter(item => item._id !== id);
    UPDATE_ORDER(this.props.orderId, {
      status: order_status,
      items: items
    }).then(() => this.setState({ items }));
  };

  onQtyChange = (id, opp) => {
    const order_status = this.state.orderStatus;
    const items = this.state.items;
    console.log(items);
    const item = items.find(item => item._id === id);
    if (item && opp === "plus") {
      ++item.quantity;
    } else {
      --item.quantity;
    }
    this.setState({ items: items });
    UPDATE_ORDER(this.props.orderId, { status: order_status, items: items });
    this.calcGrandTotal();
  };

  calcGrandTotal = () => {
    const items = this.state.items;
    const reducer = (acc, cur) => acc + cur;
    const array = items.map(({ _id, item, quantity }) => item.price * quantity);
    const sum = array.reduce(reducer);
    this.setState({ grandTotal: sum });
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
              <Table hover key={id} style={{ margin: "0.5rem" }} size="sm">
                <thead>
                  <tr>
                    <th />
                    <th>
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
                        <div>
                          <Label>{quantity}</Label>
                          <Button
                            className="btn-small"
                            outline
                            color="primary"
                            onClick={this.onQtyChange.bind(this, _id, "plus")}
                          >
                            +
                          </Button>
                          <Button
                            className="btn-small"
                            outline
                            color="danger"
                            onClick={this.onQtyChange.bind(this, _id, "minus")}
                          >
                            -
                          </Button>
                        </div>
                      </td>
                      <td>
                        <Label>${item.price * quantity}</Label>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <Label>
                        <b>Grand Total</b>
                      </Label>
                    </td>
                    <td />
                    <td />
                    <td>
                      <Label>${this.state.grandTotal}</Label>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Collapse>
        </ListGroupItem>
        <br />
      </Container>
    );
  }
}

export default Order;
