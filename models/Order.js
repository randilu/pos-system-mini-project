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
            type: [OrderItem.schema]
        },
        grand_total: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: 'Pending'
        }
    },
    {
        timestamps: true
    });

module.exports = Order = mongoose.model('order', OrderSchema);