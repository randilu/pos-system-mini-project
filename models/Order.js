const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderItem = require('../models/OrderItem');

// TODO add order status
const OrderSchema = new Schema({
        user_id: {
            type: String,
            required: true
        },
        items: {
            type: [OrderItem.schema],
            required: true
        }
    },
    {
        timestamps: true
    });

module.exports = Order = mongoose.model('order', OrderSchema);