'use strict';
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Item = require('../models/Item');

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    updateOrder,
    getOrderByUserId,
    addItemToOrder
};

/**
 * Get all available orders
 * Returns all the orders
 *
 * returns Orders
 **/
function getAllOrders() {
    return Order.find().sort({createdAt: -1});
}

/**
 * Add a new order to the store
 *
 *
 * body Order Order object that needs to be added to the store
 * no return value expected for this operation
 **/
async function createOrder(userId, items) {
    let modified_items = [];
    let grand_total = 0;
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let order_item = items[i];
            const item = await Item.findById(order_item.item_id);
            const modified_order_item = new OrderItem({
                    item: {
                        item_id: item.id,
                        item_name: item.name,
                        price: item.price
                    },
                    quantity: order_item.quantity
                }
            );
            modified_items.push(modified_order_item);
        }
        grand_total = calculateGrandTotal(modified_items);
    }
    const order = new Order({
        user_id: userId,
        items: modified_items,
        grand_total: grand_total

    });

    return order.save();
}

/**
 * Deletes an order from store
 *
 *
 * orderId String Order id to delete
 * api_key String  (optional)
 * no return value expected for this operation
 **/
function deleteOrder(orderId) {
    return Order.findByIdAndRemove(orderId);
}

/**
 * Find Order by ID
 * Returns a single order
 *
 * orderId String ID of order that needs to be fetched
 * returns Order
 **/
function getOrderById(order_id) {
    return Order.findById(order_id).sort({createdAt: -1});
}

/**
 * Find Orders by UserID
 * Returns a single order
 *
 * orderId String ID of order that needs to be fetched
 * returns Order
 **/
function getOrderByUserId(user_id) {
    return Order.find().where('user_id', user_id).sort({createdAt: -1});
}

/**
 * Updates an existing order in the store
 *
 *
 * orderId String ID of order that needs to be updated
 * body Order Order object to update
 * no return value expected for this operation
 **/
async function updateOrder(orderId, items, status) {
    let modified_items = [];

    if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
            let order_item = items[i];
            const item = await Item.findById(order_item.item.item_id);
            const modified_order_item = new OrderItem({
                    item: {
                        item_id: item.id,
                        item_name: item.name,
                        price: item.price
                    },
                    quantity: order_item.quantity
                }
            );
            modified_items.push(modified_order_item);
        }
    }
    const grand_total = calculateGrandTotal(modified_items);
    return (Order.findByIdAndUpdate(orderId, {
        status: status,
        items: modified_items,
        grand_total: grand_total
    }, {new: true}));
}

/**
 * Adds a new item to an existing order
 *
 * @param orderId, String ID of order that needs to be updated
 * @param itemId, String ID of the item to be added
 * @param quantity, added quantity
 * @returns {Promise<Query>}
 */
async function addItemToOrder(orderId, itemId, quantity) {


    const order = await Order.findById(orderId);
    const items = order.items;

    for (let i = 0; i < items.length; i++) {
        let order_item = items[i];
        if (order_item.item.item_id === itemId) {
            ++order_item.quantity;
            items[i] = order_item;
            return (Order.findByIdAndUpdate(orderId, {
                items: items
            }, {new: true}));
        }
    }

    const item = await Item.findById(itemId);

    const new_order_item = new OrderItem({
            item: {
                item_id: item.id,
                item_name: item.name,
                price: item.price
            },
            quantity: quantity
        }
    );

    items.push(new_order_item);
    const grand_total = calculateGrandTotal(items);
    return (Order.findByIdAndUpdate(orderId, {
        items: items,
        grand_total: grand_total
    }, {new: true}));
}


function calculateGrandTotal(items) {
    if (items && items.length) {
        const reducer = (acc, cur) => acc + cur;
        const array = items.map(({_id, item, quantity}) => item.price * quantity);
        return array.reduce(reducer);
    }
    return 0;
}