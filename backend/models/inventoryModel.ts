
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sizeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Size',
    required: true
  },
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

stockSchema.index({ productId: 1, sizeId: 1, color: 1 }, { unique: true });


export default mongoose.model('Stock', stockSchema);