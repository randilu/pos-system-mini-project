import React, { Component } from "react";
import {
  Button,
  ListGroupItem,
  Row,
  Col,
  Table,
  Label,
  Collapse,
  Badge,
  ListGroup
} from "reactstrap";
import SelectItemDropdown from "./SelectItemDropdown";
import { UPDATE_ORDER } from "../services/services";
import { getToken } from "../helpers/authHelper";
import { NotificationManager } from "react-notifications";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      collapse: false,
      orderStatus: "",
      badgeColor: "",
      grandTotal: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const items = this.props.items;
    const orderStatus = this.props.orderStatus;
    const grandTotal = this.props.grandTotal;

    let badgeColor;
    orderStatus === "Pending"
      ? (badgeColor = "warning")
      : (badgeColor = "success");
    this.setState({
      items: items,
      orderStatus: orderStatus,
      grandTotal: grandTotal,
      badgeColor: badgeColor
    });
  }

  toggle() {
    // event.preventDefault();
    this.setState(state => ({ collapse: !state.collapse }));
  }

  onServeClick = id => {
    if (this.state.orderStatus !== "Served") {
      NotificationManager.success("Success message", "Marked as Served!");
      NotificationManager.info("Note: You won't be able to edit Served Orders");
      const items = this.state.items;
      const orderStatus = "Served";
      const badgeColor = "success";
      UPDATE_ORDER(id, { status: orderStatus, items }, getToken()).then(res => {
        const orderStatus = res.data.status;
        this.setState({ orderStatus, badgeColor });
      });
    }
  };

  getOrderStatus = items => {
    this.setState({ items });
  };

  onRemoveItem = id => {
    const order_status = this.state.orderStatus;
    const items = this.state.items.filter(item => item._id !== id);
    UPDATE_ORDER(
      this.props.orderId,
      {
        status: order_status,
        items
      },
      getToken()
    )
      .then(() => this.setState({ items }))
      .then(this.calcGrandTotal);
  };

  onQtyChange = (id, opp) => {
    const order_status = this.state.orderStatus;
    const items = this.state.items;
    const item = items.find(item => item._id === id);
    if (item && opp === "plus") {
      ++item.quantity;
    } else if (item.quantity > 1) {
      --item.quantity;
    } else {
      items.filter(item => item._id !== id);
    }

    this.setState({ items: items });
    UPDATE_ORDER(
      this.props.orderId,
      { status: order_status, items: items },
      getToken()
    );
    this.calcGrandTotal();
  };

  calcGrandTotal = () => {
    const items = this.state.items;
    const reducer = (acc, cur) => acc + cur;
    if (items && items.length) {
      const array = items.map(
        ({ _id, item, quantity }) => item.price * quantity
      );
      const sum = array.reduce(reducer);
      this.setState({ grandTotal: sum });
    } else {
      this.setState({ grandTotal: 0 });
    }
  };

  render() {
    const id = this.props.orderId;
    const userId = this.props.userId;
    const items = this.state.items;
    const orderStatus = this.state.orderStatus;
    const badgeColor = this.state.badgeColor;
    const disable =
      this.state.orderStatus === "Served" ? "disable-element" : "";
    return (
      <ListGroup>
        <ListGroupItem key={id}>
          <Row>
            <Col>
              <Badge color="secondary">
                <b>#{id}</b>
              </Badge>
              <Badge color={badgeColor} style={{ margin: "1rem" }}>
                {orderStatus}
              </Badge>
            </Col>
            <Col>
              <h3>
                <Badge
                  color="secondary"
                  style={{ float: "right", margin: "1rem" }}
                >
                  ${this.state.grandTotal}
                </Badge>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className="btn-create"
                color="primary"
                size="md"
                onClick={this.onServeClick.bind(this, id)}
              >
                Serve Order
              </Button>
            </Col>
            <Col>
              <div className={disable}>
                <SelectItemDropdown
                  userId={userId}
                  orderId={id}
                  getOrderStatus={this.getOrderStatus}
                  calcGrandTotal={this.calcGrandTotal}
                  onSelect={this.toggle}
                />
              </div>
            </Col>
            <Col>
              <Button color="info" onClick={this.toggle}>
                View Details
              </Button>
            </Col>
            <Col>
              <Button
                className="btn-remove"
                onClick={this.props.onRemoveOrder.bind(this, id)}
              >
                Delete
              </Button>
            </Col>
          </Row>
          <Collapse isOpen={this.state.collapse}>
            <Row>
              <Table
                hover
                key={id}
                style={{ margin: "0.5rem" }}
                size="sm"
                className={disable}
              >
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
                          className="btn-remove"
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
                            color="primary"
                            onClick={this.onQtyChange.bind(this, _id, "plus")}
                          >
                            +
                          </Button>
                          <Button
                            className="btn-small"
                            color="primary"
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
      </ListGroup>
    );
  }
}

export default Order;
