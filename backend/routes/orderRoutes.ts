import express from 'express';
import { Order } from '../models/orderModel.js';
import  Stock  from '../models/inventoryModel.js';

const router = express.Router();

// Create order (checkout)
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    // Check stock availability
    for (const item of items) {
      const stock = await Stock.findOne({
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
    const order = await Order.create({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    });

    // Reduce stock
    for (const item of items) {
      await Stock.findOneAndUpdate(
        {
          productId: item.productId,
          sizeId: item.sizeId,
          color: item.color
        },
        { $inc: { quantity: -item.quantity } }
      );
    }

    res.status(201).json({ order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.productId')
      .populate('items.sizeId');
    
    res.json({ orders });
  } catch (error) {
     console.error('Fetch orders error:', error); 
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get all orders (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .populate('items.productId')
      .populate('items.sizeId');
    
    res.json({ orders });
  } catch (error) {
     console.error('Fetch orders error:', error); 
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

export default router;