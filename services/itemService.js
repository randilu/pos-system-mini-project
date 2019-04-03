'use strict';
const Item = require('../models/Item')

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    deleteItem,
    updateItem
};

/**
 * Get all available items
 * Returns all the items
 *
 * returns Items
 **/
function getAllItems() {
    return Item.find().sort({date: -1});
}

/**
 * Add a new item to the store
 *
 *
 * body Item object that needs to be added to the store
 * no return value expected for this operation
 **/
function createItem(name, price) {
    // Create a Item
    const item = new Item({
        name,
        price
    });
    // Save Item in the database
    return item.save();
}

/**
 * Deletes an item from store
 *
 *
 * itemId String Item id to delete
 * api_key String  (optional)
 * no return value expected for this operation
 **/
function deleteItem(itemId) {
    return Item.findByIdAndRemove(itemId);
}

/**
 * Find Item by ID
 * Returns a single item
 *
 * itemId String ID of order that needs to be fetched
 * returns Item
 **/
function getItemById(item_id) {
    return Item.findById(item_id);
}


/**
 * Updates an existing item in the store
 *
 *
 * itemId String ID of item that needs to be updated
 * body Item Item object to update
 * no return value expected for this operation
 **/
function updateItem(itemId, itemName, itemPrice) {
    return (Item.findByIdAndUpdate(itemId,
        {
            name: itemName,
            price: itemPrice
        }, {new: true}));
}

//
// /**
//  * uploads an image
//  *
//  *
//  * itemId String ID of item to update
//  * additionalMetadata String Additional data to pass to server (optional)
//  * file File file to upload (optional)
//  * no return value expected for this operation
//  **/
// exports.uploadFile = function (itemId, additionalMetadata, file) {
//
// }



