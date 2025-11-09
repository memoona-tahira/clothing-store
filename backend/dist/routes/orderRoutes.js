"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderModel_js_1 = require("../models/orderModel.js");
const inventoryModel_js_1 = __importDefault(require("../models/inventoryModel.js"));
const router = express_1.default.Router();
// Create order (checkout)
router.post('/', async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;
        // Check stock availability
        for (const item of items) {
            const stock = await inventoryModel_js_1.default.findOne({
                productId: item.productId,
                sizeId: item.sizeId,
                color: item.color
            });
            if (!stock || stock.quantity < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${item.name}`
                });
            }
        }
        // Create order
        const order = await orderModel_js_1.Order.create({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status: 'pending'
        });
        // Reduce stock
        for (const item of items) {
            await inventoryModel_js_1.default.findOneAndUpdate({
                productId: item.productId,
                sizeId: item.sizeId,
                color: item.color
            }, { $inc: { quantity: -item.quantity } });
        }
        res.status(201).json({ order });
    }
    catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});
// Get user orders
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await orderModel_js_1.Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 })
            .populate('items.productId')
            .populate('items.sizeId');
        res.json({ orders });
    }
    catch (error) {
        console.error('Fetch orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
// Get all orders (admin)
router.get('/admin/all', async (req, res) => {
    try {
        const orders = await orderModel_js_1.Order.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email')
            .populate('items.productId')
            .populate('items.sizeId');
        res.json({ orders });
    }
    catch (error) {
        console.error('Fetch orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
// Update order status (admin)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderModel_js_1.Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map