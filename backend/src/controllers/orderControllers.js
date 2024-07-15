// src/controllers/orderController.js
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const sendEmail = require("../utils/email");
const eventEmitter = require("../utils/eventEmmitter");

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        eventEmitter.emit("orderPlaced", order);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrdersByCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const orders = await Order.findAll({ where: { customerId } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

eventEmitter.on('orderPlaced', async (order) => {
    const customer = await Customer.findByPk(order.customerId);
    if (customer) {
        sendEmail(customer.email, `Order Confirmation: Your order ${order.id} has been placed successfully`);
        console.log(`Order placed: ${order.id}`);
    } else {
        console.log(`Customer not found for order: ${order.id}`);
    }
});
