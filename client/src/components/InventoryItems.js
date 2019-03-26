import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Label from "reactstrap/es/Label";
import { GET_ITEMS, DELETE_ITEM } from "../services/services";

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
    GET_ITEMS().then(res => {
      const items = res.data;
      this.setState({ items });
    });
  }

  onDeleteClick = id => {
    DELETE_ITEM(id).then(res => {
      const items = this.state.items.filter(item => item._id !== id);
      this.setState({ items });
    });
  };

  render() {
    const items = this.state.items;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="inventory-list">
            {items.map(({ _id, name, price }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
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
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default InventoryItems;
