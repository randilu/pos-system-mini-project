const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

// Routes

// GET request for list of all Item items.
router.get('/', getAllItems);

// POST request for creating Item.
router.post('/', createItem);

// GET request for one Item.
router.get('/:id', getItemById);

// DELETE request to delete Item.
router.delete('/:id', deleteItem);

// PUT request to update Item.
router.put('/:id', updateItem);

module.exports = router;

/**
 * Handle items fetch on GET.
 *
 * @param req
 * @param res
 */
function getAllItems(req, res) {
    itemService.getAllItems()
        .then(items => res.json(items))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving items."
            });
        });
}

/**
 * Handle item fetch by ID on GET.
 *
 * @param req
 * @param res
 */
function getItemById(req, res) {
    itemService.getItemById(req.params.id)
        .then(item => item ? res.json(item) : res.status(404).send({
            message: "Item not found with id " + req.params.id
        }))
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving item with id " + req.params.id
            });
        });
}

/**
 * Handle item create on POST.
 *
 * @param req
 * @param res
 */
function createItem(req, res) {
    // Validate request
    if (!req.body.price || !req.body.name) {
        return res.status(400).send({
            message: "Item name or price can not be empty"
        });
    }
    itemService.createItem(req.body.name, req.body.price)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the Item."
            });
        });
}

/**
 * Display item delete form on GET.
 *
 * @param req
 * @param res
 */
function deleteItem(req, res) {
    itemService.deleteItem(req.params.id)
        .then(item => item ? res.send({message: "Item deleted successfully!"}) : res.status(404).send({
            message: "Item not found with id " + req.params.id
        }))
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete item with id " + req.params.id
            });
        });
}

/**
 *  Handle item update on PUT.
 *
 * @param req
 * @param res
 */
function updateItem(req, res) {
    // Validate Request
    if (!req.body.price) {
        return res.status(400).send({
            message: "Item price can not be empty"
        });
    }

    // Find item and update it with the request body
    itemService.updateItem(req.params.id, req.body.name, req.body.price)
        .then(item => item ? res.json(item) : res.status(404).send({
            message: "Item not found with id " + req.params.id
        }))
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating item with id " + req.params.id
            });
        });
}




