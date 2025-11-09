"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_js_1 = __importDefault(require("./middlewhare/passport.js"));
// Import routes
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const productsRoutes_js_1 = __importDefault(require("./routes/productsRoutes.js"));
const sizesRoutes_js_1 = __importDefault(require("./routes/sizesRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const cardRoutes_js_1 = __importDefault(require("./routes/cardRoutes.js"));
const stockRoutes_js_1 = __importDefault(require("./routes/stockRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FE_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/images', express_1.default.static('images'));
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});
// Session configuration
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
}));
// Passport middleware
app.use(passport_js_1.default.initialize());
app.use(passport_js_1.default.session());
// MongoDB Connection
async function connectDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        process.exit(1);
    }
}
connectDB();
// Routes
app.use('/auth', authRoutes_js_1.default);
app.use('/api/v1/products', productsRoutes_js_1.default);
app.use('/api/v1/sizes', sizesRoutes_js_1.default);
app.use('/api/v1/users', userRoutes_js_1.default);
app.use('/api/v1/orders', orderRoutes_js_1.default);
app.use('/api/v1/cards', cardRoutes_js_1.default);
app.use('/api/v1/stock', stockRoutes_js_1.default);
// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map