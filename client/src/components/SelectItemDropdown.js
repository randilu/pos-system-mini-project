import React, {Component} from "react";
import {Dropdown} from "react-bootstrap";
import {
    GET_ITEMS,
    UPDATE_ORDER,
    ADD_ITEM_TO_ORDER
} from "../services/services";

class SelectItemDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemId: "",
            userId: ""
        };
    }

    // life cycle method which runs when the component mount
    componentDidMount() {
        GET_ITEMS().then(res => {
            const items = res.data;
            // console.log(items);
            this.setState({items: items, userId: this.props.userId});
        });
    }

    onDeleteClick = id => {
        this.props.deleteOrder(id);
    };

    onAddItemClick = id => {
        UPDATE_ORDER();
        // UPDATE_ORDER(id, order).then(res => {
        //     const order_items = res.data;
        //     this.setState({orders});
        //  })
    };

    handleOnSelect = itemId => {
        ADD_ITEM_TO_ORDER(this.props.orderId, {item_id: itemId})
            .then(res => this.props.getOrderStatus(res.data.items));

        console.log(this.props.orderId);
        console.log({itemId});
    };
    onChange = event => {
        this.setState({});
    };

    onSubmit = event => {
        event.preventDefault();

        const newItem = {
            name: this.state.name,
            price: this.state.price
        };

        // Add item via addItem action
        this.props.addItem(newItem);

        // Close Modal
        this.toggle();
    };

    render() {
        const items = this.state.items;
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Add Item
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items.map(({_id, name, price}) => (
                            <Dropdown.Item
                                key={_id}
                                onSelect={this.handleOnSelect.bind(this, _id)}
                            >
                                {name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default SelectItemDropdown;
