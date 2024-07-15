const Order = require("../models/Order");
const Customer = require("../models/Customer");
const eventEmitter = require("../utils/eventEmmitter");
const sendEmail = require("../utils/email");

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        eventEmitter.emit("orderPlaced", order);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

eventEmitter.on('orderPlaced', async(order)=>{
    const Customer = await Customer.findByPk(order.customerId);
    sendEmail(customer.email, `Order Confirmation, Yourt order ${order.id} has been placed successfully`);
    console.log(`Order placed : ${order.id}`)
});
