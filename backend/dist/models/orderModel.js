"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'ClothingUser',
        required: true
    },
    orderNumber: {
        type: String,
        unique: true
    },
    items: [{
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            price: Number,
            sizeId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose_1.default.model('Order').countDocuments();
        this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
    }
    next();
});
exports.Order = mongoose_1.default.model('Order', orderSchema);
exports.default = exports.Order;
//# sourceMappingURL=orderModel.js.map