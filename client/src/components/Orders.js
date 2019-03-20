import React, {Component} from "react";
import {Container, Button, ListGroup, ListGroupItem, Row, Col} from "reactstrap";
import {connect} from "react-redux";
import {getOrders, deleteOrder, addOrder} from "../actions/orderActions";
import PropTypes from "prop-types";
import Label from "reactstrap/es/Label";

class Orders extends Component {
    // life cycle method which runs when the component mount
   

    componentDidMount() {
        this.props.getOrders();
    }

    onDeleteClick = id => {
        this.props.deleteOrder(id);
    };

    calcGrandTotal=  items => {
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
    
    calcGrandTotal=  items => {

        // let sum =0;
        
        // let sum =items.map((quantity, item) => item.price*quantity);
        // let arr = JSON.parse(items);
        //  let i =arr[1].quantity;
        //  console.log(i);
        console.log(items);
        let sum=0;
        for (let object in items){
            console.log(object[0].quantity);
            // let obj = object[0];
            // console.log(obj.quantity);
            // console.log(object.quantity);
            // sum+=object.item.price*object.quantity;
        }
        return sum;
    };
    

    render() {
        const {orders} = this.props.order;
        return (
            <Container style={{marginTop: "5rem"}} >
                <Label>Current Orders</Label>
                <ListGroup className="order-list">
                        {orders.map(({_id, user_id, items}) => (
                            <ListGroupItem key={_id} >
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="md"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                >
                                    Remove Order
                                </Button>
                                <ListGroup className="order-items" style={{textAlign: "center"}}>
                                    <Row>
                                        <Col xs="6" sm="4">Item</Col>
                                        <Col xs="6" sm="4">Qty</Col>
                                        <Col sm="4">Cost</Col>
                                    </Row>
                                    {items.map(({_id, item, quantity}) => (
                                        <ListGroupItem  key={_id} >
                                            <Row >
                                                <Col xs="6" sm="4" >{item.item_name}</Col>
                                                <Col xs="6" sm="4">{quantity}</Col>
                                                <Col sm="4" >${item.price*quantity}</Col>
                                            </Row>

                                        </ListGroupItem>
                                        
                                    ))}
                                    <Row className = "row-item" style={{textAlign: "center"}}>
                                        <Col xs="6" sm="4">Grand Total</Col>
                                        <Col sm="4">{this.calcGrandTotal(items)}</Col>
                                    </Row>
                                </ListGroup>
                            </ListGroupItem>

                        ))}
                </ListGroup>
            </Container>
        );
    }
}

Orders.propTypes = {
    getOrders: PropTypes.func.isRequired, //action from redux stored as a prop
    order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({order: state.order});

export default connect(
    mapStateToProps,
    {getOrders, deleteOrder, addOrder}
)(Orders);
