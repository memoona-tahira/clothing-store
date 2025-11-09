"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sizeModel_js_1 = __importDefault(require("../models/sizeModel.js"));
const getAllSizes = async (req, res) => {
    const s = await sizeModel_js_1.default.find();
    res.json({
        sizes: s
    });
};
exports.default = getAllSizes;
//# sourceMappingURL=sizesController.js.map