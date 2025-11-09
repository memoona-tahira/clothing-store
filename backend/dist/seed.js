"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_ts_1 = __importDefault(require("./models/categoryModel.ts"));
const sizeModel_ts_1 = __importDefault(require("./models/sizeModel.ts"));
const productModel_ts_1 = __importDefault(require("./models/productModel.ts"));
const inventoryModel_ts_1 = __importDefault(require("./models/inventoryModel.ts"));
async function connectDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("✓ MongoDB Connected Successfully");
    }
    catch (error) {
        console.error("✗ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}
async function seedDB() {
    await connectDB();
    // Seed Categories
    const categoryCount = await categoryModel_ts_1.default.countDocuments();
    if (categoryCount === 0) {
        await categoryModel_ts_1.default.insertMany([
            { name: "Men" },
            { name: "Women" },
            { name: "Kids" },
        ]);
        console.log("✓ Categories seeded: 3");
    }
    // Seed Sizes
    const sizeCount = await sizeModel_ts_1.default.countDocuments();
    if (sizeCount === 0) {
        await sizeModel_ts_1.default.insertMany([
            { value: "XS", forKids: false },
            { value: "S", forKids: false },
            { value: "M", forKids: false },
            { value: "L", forKids: false },
            { value: "XL", forKids: false },
            { value: "110", forKids: true },
            { value: "128", forKids: true },
            { value: "146", forKids: true },
            { value: "164", forKids: true },
            { value: "170", forKids: true },
        ]);
        console.log("✓ Sizes seeded: 10");
    }
    // Get categories for product creation
    const menCategory = await categoryModel_ts_1.default.findOne({ name: "Men" });
    const womenCategory = await categoryModel_ts_1.default.findOne({ name: "Women" });
    // Seed Products (Men)
    const productCount = await productModel_ts_1.default.countDocuments();
    if (productCount === 0) {
        await productModel_ts_1.default.create({
            name: "Carpenter byxor",
            description: "Workwear-inspirerade byxor i kraftigt bomullstyg. Byxorna har fickor fram med synliga stygn på utsidan och två fickor bak. Knappgylf och skärphällor. Byxorna har avslappnad passform och raka ben. Innerbenslängd 79 cm i storlek 33.",
            categoryId: menCategory._id,
            price: 549,
            images: [
                "carpenter-pants-front.jpg",
                "carpenter-pants-back.jpg",
            ],
        });
        await productModel_ts_1.default.create({
            name: "Rundhalsad t-shirt",
            description: "Enfärgad t-shirt i mjuk och lite kraftigare bomullskvalitet. Ett basplagg som är användbart vid alla tillfällen. T-shirt för herr som är kvalitetssäkrad och uppvisade på tåligt material, bra färgbeständighet och behöll formen bra i Testfaktas test av t-shirts 2024. Längd 72 cm storlek M. Innehåller 90% ekologisk bomull.",
            categoryId: menCategory._id,
            price: 199,
            images: [
                "tshirt-white-front.jpg",
                "tshirt-white-back.jpg",
            ],
        });
        await productModel_ts_1.default.create({
            name: "Pyjamas",
            description: "Tvådelad pyjamas i mjuk och skön kvalitet. Rak ledig passform på byxor med resår i midjan och sidfickor. Lätt A-linje formad skjorta ger skön rörlighet och fin look. Längd pyjamasskjorta 67 cm i storlek S. Innerbenslängd pyjamasbyxor 75 cm i storlek S.",
            categoryId: womenCategory._id,
            price: 499,
            images: [
                "pyjamas-front.jpg",
                "pyjamas-back.jpg",
            ],
        });
        console.log("✓ Products seeded: 3");
    }
    // Get products and sizes for stock creation
    const carpenterProduct = await productModel_ts_1.default.findOne({ name: "Carpenter byxor" });
    const tshirtProduct = await productModel_ts_1.default.findOne({ name: "Rundhalsad t-shirt" });
    const pyjamasProduct = await productModel_ts_1.default.findOne({ name: "Pyjamas" });
    const sizeS = await sizeModel_ts_1.default.findOne({ value: "S" });
    const sizeM = await sizeModel_ts_1.default.findOne({ value: "M" });
    const sizeL = await sizeModel_ts_1.default.findOne({ value: "L" });
    const sizeXL = await sizeModel_ts_1.default.findOne({ value: "XL" });
    // Seed Stock
    const stockCount = await inventoryModel_ts_1.default.countDocuments();
    if (stockCount === 0) {
        await inventoryModel_ts_1.default.insertMany([
            // Carpenter byxor - Green
            {
                productId: carpenterProduct._id,
                sizeId: sizeM._id,
                color: "Green",
                quantity: 5,
            },
            {
                productId: carpenterProduct._id,
                sizeId: sizeL._id,
                color: "Green",
                quantity: 2,
            },
            {
                productId: carpenterProduct._id,
                sizeId: sizeXL._id,
                color: "Green",
                quantity: 4,
            },
            // Carpenter byxor - Beige
            {
                productId: carpenterProduct._id,
                sizeId: sizeM._id,
                color: "Beige",
                quantity: 1,
            },
            {
                productId: carpenterProduct._id,
                sizeId: sizeL._id,
                color: "Beige",
                quantity: 1,
            },
            {
                productId: carpenterProduct._id,
                sizeId: sizeXL._id,
                color: "Beige",
                quantity: 4,
            },
            // T-shirt - White
            {
                productId: tshirtProduct._id,
                sizeId: sizeS._id,
                color: "White",
                quantity: 15,
            },
            {
                productId: tshirtProduct._id,
                sizeId: sizeM._id,
                color: "White",
                quantity: 20,
            },
            // Pyjamas - Black
            {
                productId: pyjamasProduct._id,
                sizeId: sizeS._id,
                color: "Black",
                quantity: 12,
            },
            {
                productId: pyjamasProduct._id,
                sizeId: sizeM._id,
                color: "Black",
                quantity: 18,
            },
        ]);
        console.log("✓ Stock seeded: 10 items");
    }
    console.log("\n✓ Seed completed successfully!");
    console.log("=================================");
    console.log("Database has been seeded with:");
    console.log("- 3 Categories (Men, Women, Kids)");
    console.log("- 10 Sizes (5 adult, 5 kids)");
    console.log("- 3 Products");
    console.log("- 10 Stock items");
    console.log("=================================\n");
    process.exit(0);
}
seedDB().catch((error) => {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map