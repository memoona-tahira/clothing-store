import express from 'express';
import { Card } from '../models/cardModel.js';

const router = express.Router();

// Get user cards
router.get('/user/:userId', async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.params.userId }).sort({ isDefault: -1 });
    res.json({ cards });
  } catch (error) {
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
    if (firstDigit === '5') cardType = 'Mastercard';
    if (firstDigit === '3') cardType = 'Amex';

    // If setting as default, unset other defaults
    if (isDefault) {
      await Card.updateMany({ userId }, { isDefault: false });
    }

    const card = await Card.create({
      userId,
      cardholderName,
      lastFourDigits: cardNumber.slice(-4),
      cardType,
      expiryMonth,
      expiryYear,
      isDefault
    });

    res.status(201).json({ card });
  } catch (error) {
    console.error('Add card error:', error);
    res.status(500).json({ error: 'Failed to add card' });
  }
});

// Delete card
router.delete('/:id', async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// Set default card
router.patch('/:id/default', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Unset other defaults
    await Card.updateMany({ userId: card.userId }, { isDefault: false });
    
    // Set this as default
    card.isDefault = true;
    await card.save();

    res.json({ card });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set default card' });
  }
});

export default router;

