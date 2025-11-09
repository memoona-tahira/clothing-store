"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_js_1 = require("../controllers/productController.js");
const inventoryController_js_1 = __importDefault(require("../controllers/inventoryController.js"));
const router = express_1.default.Router();
//router.get("/", getProducts);
//router.post("/", createProduct);
router.route('/')
    .get(productController_js_1.getProducts)
    .post(productController_js_1.createProduct);
router.route('/:id')
    .get(productController_js_1.getProductById)
    .put(productController_js_1.updateProduct)
    .delete(productController_js_1.deleteProduct);
router.route('/:id/stock').get(inventoryController_js_1.default);
exports.default = router;
//# sourceMappingURL=productsRoutes.js.map