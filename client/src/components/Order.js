import React, {Component} from "react";
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
import {UPDATE_ORDER} from "../services/services";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        const items = this.props.items;
        this.setState({items});
    }

    toggle(event) {
        event.preventDefault();
        this.setState(state => ({collapse: !state.collapse}));
    }

    onDeleteClick = id => {
        this.props.deleteOrder(id);
    };

    getOrderStatus = items => {
        this.setState({items});
    };

    onRemoveItem = id => {
        const items = this.state.items.filter(item => item._id !== id);
        UPDATE_ORDER(this.props.orderId, {items}).then(() =>
            this.setState({items})
        );
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

    render() {
        const id = this.props.orderId;
        const userId = this.props.userId;
        const items = this.state.items;
        return (
            <Container>
                <ListGroupItem key={id}>
                    <Row>
                        <Col>
                            <Button
                                className="remove-btn"
                                color="danger"
                                size="md"
                                onClick={this.onDeleteClick.bind(this, id)}
                            >
                                Remove Order
                            </Button>
                        </Col>
                        <Col>
                            <Label>Status</Label>
                        </Col>
                        <Col>
                            <SelectItemDropdown
                                userId={userId}
                                orderId={id}
                                getOrderStatus={this.getOrderStatus}
                            />
                        </Col>
                        <Col>
                            <Button color="info" onClick={this.toggle}>
                                View Details
                            </Button>
                        </Col>
                    </Row>
                    <Collapse isOpen={this.state.collapse}>
                        <Row>
                            <Table key={id} style={{margin: "0.5rem"}}>
                                <thead>
                                <tr>
                                    <th/>
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
                                {items.map(({_id, item, quantity}) => (
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
                                            <Label>{quantity}</Label>
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
