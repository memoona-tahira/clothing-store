import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardholderName: {
    type: String,
    required: true,
    trim: true
  },
  lastFourDigits: {
    type: String,
    required: true,
    length: 4
  },
  cardType: {
    type: String,
    enum: ['Visa', 'Mastercard', 'Amex'],
    required: true
  },
  expiryMonth: {
    type: String,
    required: true
  },
  expiryYear: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const Card = mongoose.model('Card', cardSchema);
export default Card;