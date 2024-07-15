const Order = require("../models/Order");
const Customer = require("../models/Customer");
const eventEmitter = require("../utils/eventEmitter");


exports.placeOrder = async (req, res) => {
    try {
        const { customerId, total } = req.body;

        const newOrder = await Order.create({ customerId, total });
        
       
        eventEmitter.emit('orderPlaced', newOrder._id, customerId);

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { customerId: req.params.customerId }, include: [Customer] });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
