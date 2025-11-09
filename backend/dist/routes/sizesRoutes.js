"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sizesController_js_1 = __importDefault(require("../controllers/sizesController.js"));
router.route("/").get(sizesController_js_1.default);
exports.default = router;
//# sourceMappingURL=sizesRoutes.js.map