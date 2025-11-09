"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardModel_js_1 = require("../models/cardModel.js");
const router = express_1.default.Router();
// Get user cards
router.get('/user/:userId', async (req, res) => {
    try {
        const cards = await cardModel_js_1.Card.find({ userId: req.params.userId }).sort({ isDefault: -1 });
        res.json({ cards });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});
// Add card
router.post('/', async (req, res) => {
    try {
        const { userId, cardholderName, cardNumber, expiryMonth, expiryYear, cvv, isDefault } = req.body;
        // Determine card type from first digit
        const firstDigit = cardNumber[0];
        let cardType = 'Visa';
        if (firstDigit === '5')
            cardType = 'Mastercard';
        if (firstDigit === '3')
            cardType = 'Amex';
        // If setting as default, unset other defaults
        if (isDefault) {
            await cardModel_js_1.Card.updateMany({ userId }, { isDefault: false });
        }
        const card = await cardModel_js_1.Card.create({
            userId,
            cardholderName,
            lastFourDigits: cardNumber.slice(-4),
            cardType,
            expiryMonth,
            expiryYear,
            isDefault
        });
        res.status(201).json({ card });
    }
    catch (error) {
        console.error('Add card error:', error);
        res.status(500).json({ error: 'Failed to add card' });
    }
});
// Delete card
router.delete('/:id', async (req, res) => {
    try {
        await cardModel_js_1.Card.findByIdAndDelete(req.params.id);
        res.json({ message: 'Card deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete card' });
    }
});
// Set default card
router.patch('/:id/default', async (req, res) => {
    try {
        const card = await cardModel_js_1.Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        // Unset other defaults
        await cardModel_js_1.Card.updateMany({ userId: card.userId }, { isDefault: false });
        // Set this as default
        card.isDefault = true;
        await card.save();
        res.json({ card });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to set default card' });
    }
});
exports.default = router;
//# sourceMappingURL=cardRoutes.js.map