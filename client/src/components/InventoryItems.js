import React, {Component} from "react";
import {Container, Button, ListGroup, ListGroupItem} from "reactstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {connect} from "react-redux";
import {getItems, deleteItem} from "../actions/itemActions";
import PropTypes from "prop-types";
import Label from "reactstrap/es/Label";

class InventoryItems extends Component {
    // life cycle method which runs when the component mount
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        const {items} = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="inventory-list">
                        {items.map(({_id, name, price}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="md"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        Delete
                                    </Button>
                                        <Label>{name}</Label>
                                        <Label className="item-price-lab">{price}</Label>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

InventoryItems.propTypes = {
    getItems: PropTypes.func.isRequired, //action from redux stored as a prop
    item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({item: state.item});

export default connect(
    mapStateToProps,
    {getItems, deleteItem}
)(InventoryItems);
