const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('../models/Item');


const IItem = new Schema({
    item: Item.schema,
    quantity: {type:Number, default: 1}

});

// Create Schema

const orderSchema = new Schema({
        user_id: {
            type: String,
            required: true
        },
        items: {
            type: [IItem],
            required: true
        }
    },
    {
        timestamps: true
    });

module.exports = Order = mongoose.model('order', orderSchema);