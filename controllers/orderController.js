const Order = require('../models/Order');
const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

// Routes

// GET request for list of all Order items.
router.get('/', getAllOrders);

// POST request for creating Order.
router.post('/', createOrder);

// GET request for one Order.
router.get('/:id', getOrderById);

// DELETE request to delete Order.
router.delete('/:id', deleteOrder);

// PUT request to update Order.
router.put('/:id', updateOrder);

// GET request for one orders of a user.
router.get('/user/:id', getOrderByUserId);

module.exports = router;

/**
 * Display list of all orders.
 *
 */
function getAllOrders(req, res) {
    orderService.getAllOrders()
        .then(orders => res.json(orders))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving orders."
            });
        });
}

/**
 * Display list of all orders of a user.
 *
 */
function getOrderByUserId(req, res) {
    orderService.getOrderByUserId(req.params.id)
        .then(orders => orders ? res.json(orders) : res.status(404).send({
            message: "User not found with id " + req.params.id
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving orders."
            });
        });

}

/**
 * Display a specific order by id.
 *
 */
function getOrderById(req, res) {
    orderService.getOrderById(req.params.id)
        .then(order => order ? res.json(order) : res.status(404).send({
            message: "Order not found with id " + req.params.id
        }))
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: err.message || "Error retrieving order with id " + req.params.id
            });
        });
}

/**
 * Handle order create on POST.
 *
 */
function createOrder(req, res) {
    // Validate request
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "Order user_id can not be empty"
        });
    }
    orderService.createOrder(req.body.user_id, req.body.items)
        .then(order => res.json(order))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the Order."
            });
        });
}

/**
 * Display order delete form on GET.
 *
 */
function deleteOrder(req, res) {
    orderService.deleteOrder(req.params.id)
        .then(order => order ? res.json({message: "Order deleted successfully!"}) : res.status(404).send({
            message: "Order not found with id " + req.params.id
        })).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.id
        });
    });
}

/**
 *  Handle order update on PUT.
 *
 */
function updateOrder(req, res) {
    // Validate Request
    if (!req.body.user_id) {
        return res.status(400).send({
            message: "User ID of order creator can not be empty"
        });
    }

    // Find order and update it with the request body
    orderService.updateOrder(req.params.id, req.body.user_id, req.body.items)
        .then(order => order ? res.json(order) : res.status(404).send({
            message: "Order not found with id " + req.params.id
        }))
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating order with id " + req.params.id
            });
        });
}

