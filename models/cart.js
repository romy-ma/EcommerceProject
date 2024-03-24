const mongoose = require('mongoose')

// Schéma de panier
const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{
        productId: String,
        quantity: Number
    }]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart