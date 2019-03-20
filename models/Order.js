const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderItem = require('../models/OrderItem');



/*const IItem = new Schema({
    item: Item.schema,
    quantity: {type:Number, default: 1}

});

// Create Schema

const OrderSchema = new Schema({
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
    });*/



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