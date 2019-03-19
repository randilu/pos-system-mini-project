'use strict';
const Order = require('../models/Order')


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    updateOrder
};

/**
 * Get all available orders
 * Returns all the orders
 *
 * returns Orders
 **/
function getAllOrders() {
    return Order.find().sort({date: -1});
}

/**
 * Add a new order to the store
 *
 *
 * body Order Order object that needs to be added to the store
 * no return value expected for this operation
 **/
function createOrder(userId, items) {
    const order = new Order({
        user_id: userId,
        items: items
    });
    return order.save();
}

// function createOrder(userId, items) {
//     const order_count_promise = Order.countDocuments({});
//     order_count_promise.then(count => {
//         const order = new Order({
//             order_no: ++count,
//             user_id: userId,
//             items: items
//         });
//         order.save();
//         Order.count++;
//     });
// }

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
    return Order.findById(order_id);
}

/**
 * Find Orders by UserID
 * Returns a single order
 *
 * orderId String ID of order that needs to be fetched
 * returns Order
 **/
function getOrderByUserId(user_id) {
    return Order.find().where('customer_id', user_id);
}


/**
 * Updates an existing order in the store
 *
 *
 * orderId String ID of order that needs to be updated
 * body Order Order object to update
 * no return value expected for this operation
 **/
function updateOrder(orderId, userId, items) {
    return (Order.findByIdAndUpdate(orderId, {
        user_id: userId,
        items: items
    }, {new: true}));
}

