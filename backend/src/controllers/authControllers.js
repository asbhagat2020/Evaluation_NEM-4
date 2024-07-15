const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await Customer.create({ name, email, password: hashedPassword });
        
        return res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ where: { email } });

        if (!customer) return res.status(400).json({ message: "Email or password is wrong" });

        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) return res.status(400).json({ message: 'Email or password is wrong' });

        const token = jwt.sign({ id: customer.id, role: customer.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('Authorization', `Bearer ${token}`).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
