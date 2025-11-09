import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingUser',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size',
      required: true
    },
    sizeValue: String,
    color: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: {
    cardType: String,
    lastFourDigits: String
  }
}, { timestamps: true });

// Auto-generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

export const Order = mongoose.model('Order', orderSchema);
export default Order;