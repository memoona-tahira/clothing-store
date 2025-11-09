"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventoryModel_js_1 = __importDefault(require("../models/inventoryModel.js"));
// GET all products
const getProductInventory = async (req, res) => {
    console.log('req.params:', req.params);
    console.log('req.query:', req.query);
    console.log('Full URL:', req.originalUrl);
    const productid = req.params.id;
    const stockInDB = await inventoryModel_js_1.default.find({ productId: productid });
    res.json({
        message: "stock for product",
        stock: stockInDB,
        product: productid
    });
};
exports.default = getProductInventory;
//# sourceMappingURL=inventoryController.js.map