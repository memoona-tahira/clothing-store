
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Men', 'Women', 'Kids']
  }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);