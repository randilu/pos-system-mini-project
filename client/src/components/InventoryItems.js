import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import Label from "reactstrap/es/Label";
import { GET_ITEMS, DELETE_ITEM } from "../services/services";
import ItemModal from "./ItemModal";
import { getToken } from "../helpers/authHelper";
import { NotificationManager } from "react-notifications";

class InventoryItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item_id: ""
    };
  }

  // life cycle method which runs when the component mount
  componentDidMount() {
    GET_ITEMS(getToken()).then(res => {
      const items = res.data;
      this.setState({ items });
    });
  }

  onDeleteClick = id => {
    DELETE_ITEM(id, getToken()).then(res => {
      NotificationManager.warning(
        "Delete Warning",
        "Item will be permanantly deleted from the Store",
        2000
      );
      const items = this.state.items.filter(item => item._id !== id);
      this.setState({ items });
    });
  };

  onAddItem = item => {
    this.setState({ items: [...this.state.items, item] });
  };

  render() {
    const items = this.state.items;
    return (
      <Container>
        <ItemModal onAddItem={this.onAddItem} />
        <ListGroup>
          {items.map(({ _id, name, price }) => (
            <ListGroupItem key={_id}>
              <Button
                className="btn-remove"
                size="md"
                onClick={this.onDeleteClick.bind(this, _id)}
              >
                Delete
              </Button>
              <Label>{name}</Label>
              <Label className="item-price-lab">${price}</Label>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default InventoryItems;
