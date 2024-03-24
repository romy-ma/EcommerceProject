const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId: String,
    products: [{
        productId: String,
        quantity: Number
    }],
    shippingDetails: {
        address: String,
        city: String,
        postalCode: String
    },
    totalPrice: Number,
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order