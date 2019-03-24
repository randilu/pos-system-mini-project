const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    item: {
        item_id: {type: String, required: true},
        item_name: {type: String},
        price: {type: Number}
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = OrderItem = mongoose.model('orderItem', OrderItemSchema);