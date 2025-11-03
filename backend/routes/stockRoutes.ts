
import express from 'express';
import Stock from '../models/inventoryModel.js';

const router = express.Router();

// Get all stock (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate('productId', 'name images')
      .populate('sizeId', 'value')
      .sort({ 'productId.name': 1 });
    
    res.json({ stocks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
});

// Add/Update stock (admin)
router.post('/', async (req, res) => {
  try {
    const { productId, sizeId, color, quantity } = req.body;

    const stock = await Stock.findOneAndUpdate(
      { productId, sizeId, color },
      { $inc: { quantity } },
      { new: true, upsert: true }
    );

    res.json({ stock });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

export default router;