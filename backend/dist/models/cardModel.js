"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cardSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Card = mongoose_1.default.model('Card', cardSchema);
exports.default = exports.Card;
//# sourceMappingURL=cardModel.js.map