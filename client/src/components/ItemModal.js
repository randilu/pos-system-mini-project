import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { CREATE_ITEM } from "../services/services";
import { getToken } from "../helpers/authHelper";
import { NotificationManager } from "react-notifications";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    price: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.price]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const newItem = {
      name: this.state.name,
      price: this.state.price
    };

    // Add item via addItem action
    CREATE_ITEM(newItem, getToken()).then(res => {
      this.props.onAddItem(res.data);
      NotificationManager.success("Added successfully", "Item added to store!");
    });
    // Close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          className="btn-create"
          color="primary"
          size="md"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item +
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add to item list"
                  onChange={this.onChange}
                />
                <Label for="item_price" style={{ marginTop: "2rem" }}>
                  Price
                </Label>
                <Input
                  type="text"
                  name="price"
                  id="item_price"
                  placeholder="Add price"
                  onChange={this.onChange}
                />
                <Button
                  className="btn-create"
                  color="primary"
                  size="md"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ItemModal;
