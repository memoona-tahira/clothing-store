"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stockSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    sizeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Stock', stockSchema);
//# sourceMappingURL=inventoryModel.js.map