"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        console.log('Attempting to connect to:', process.env.MONGODB_URI);
        await mongoose_1.default.connect(process.env.MONGODB_URI, {});
        console.log("MongoDB Connected Successfully");
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1); // stop the app if connection fails
    }
};
exports.default = connectDB;
//# sourceMappingURL=connection.js.map