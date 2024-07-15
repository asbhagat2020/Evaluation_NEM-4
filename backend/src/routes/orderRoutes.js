// src/routes/orderRoutes.js
const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { createOrder, getOrdersByCustomer } = require("../controllers/orderControllers");

const router = express.Router();

router.post("/", auth, role(['admin', 'user']), createOrder);
router.get("/:customerId", auth, role(['admin', 'user']), getOrdersByCustomer);

module.exports = router;
