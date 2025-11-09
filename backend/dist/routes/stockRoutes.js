"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryModel_js_1 = __importDefault(require("../models/inventoryModel.js"));
const router = express_1.default.Router();
// Get all stock (admin)
router.get('/admin/all', async (req, res) => {
    try {
        const stocks = await inventoryModel_js_1.default.find()
            .populate('productId', 'name images')
            .populate('sizeId', 'value')
            .sort({ 'productId.name': 1 });
        res.json({ stocks });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock' });
    }
});
// Add/Update stock (admin)
router.post('/', async (req, res) => {
    try {
        const { productId, sizeId, color, quantity } = req.body;
        const stock = await inventoryModel_js_1.default.findOneAndUpdate({ productId, sizeId, color }, { $inc: { quantity } }, { new: true, upsert: true });
        res.json({ stock });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update stock' });
    }
});
exports.default = router;
//# sourceMappingURL=stockRoutes.js.map