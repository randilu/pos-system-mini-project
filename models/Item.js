const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const itemSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    });

module.exports = Item = mongoose.model('item', itemSchema);