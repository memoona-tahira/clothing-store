"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const productModel_js_1 = __importDefault(require("../models/productModel.js"));
const categoryModel_js_1 = __importDefault(require("../models/categoryModel.js"));
const inventoryModel_js_1 = __importDefault(require("../models/inventoryModel.js"));
// GET all products
const getProducts = async (req, res) => {
    try {
        const categoryName = req.query.catagory;
        let productsFromDB = [];
        if (categoryName) {
            const categoryFromDB = await categoryModel_js_1.default.findOne({ name: categoryName });
            if (!categoryFromDB) {
                return res.status(400).json({
                    error: "Invalid category"
                });
            }
            productsFromDB = await productModel_js_1.default.find({ categoryId: categoryFromDB._id })
                .populate('categoryId', 'name');
        }
        else {
            productsFromDB = await productModel_js_1.default.find()
                .populate('categoryId', 'name');
        }
        const updatedProducts = productsFromDB.map((product) => ({
            ...product.toObject(),
            images: product.images.map((img) => `http://localhost:3000/images/${img}`),
        }));
        res.json({
            message: "get all products called",
            count: updatedProducts.length,
            products: updatedProducts
        });
    }
    catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getProducts = getProducts;
// Get one product by ID
const getProductById = async (req, res) => {
    const productFromDB = await productModel_js_1.default.findById(req.params.id);
    const updatedProduct = {
        ...productFromDB.toObject(),
        images: productFromDB.images.map((img) => `http://localhost:3000/images/${img}`),
    };
    const stocks = await inventoryModel_js_1.default.find({ productId: productFromDB._id });
    res.json({
        message: "get all products",
        product: updatedProduct,
        stock: stocks
    });
};
exports.getProductById = getProductById;
// Create new product
const createProduct = (req, res) => {
    res.json({
        message: "create products called",
    });
};
exports.createProduct = createProduct;
// Update existing product
const updateProduct = (req, res) => {
    res.json({
        message: "update products called",
    });
};
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => {
    res.json({
        message: "delet products called",
    });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map