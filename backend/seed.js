import "dotenv/config";
import mongoose from "mongoose";
import Category from "./models/categoryModel.js";
import Size from "./models/sizeModel.js";
import Product from "./models/productModel.js"
import Stock from "./models/inventoryModel.js"

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ MongoDB Connected Successfully");
  } catch (error) {
    console.error("✗ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

async function seedDB() {
  await connectDB();

  const categoryCount = await Category.countDocuments();

  if (categoryCount === 0) {
    await Category.insertMany([
      { name: "Men" },
      { name: "Women" },
      { name: "Kids" },
    ]);
  }

  const sizeCount = await Size.countDocuments();
  if (sizeCount === 0) {
    await Size.insertMany([
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
  }


  
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const menCategory = await Category.findOne({ name: "Men" });
    await Product.create({
      name: "Carpenter byxor",
      description:
        "Workwear-inspirerade byxor i kraftigt bomullstyg. Byxorna har fickor fram med synliga stygn på utsidan och två fickor bak. Knappgylf och skärphällor. Byxorna har avslappnad passform och raka ben. Innerbenslängd 79 cm i storlek 33.",
      categoryId: menCategory._id,
      price: 549,
      images: [
        "https://www.kappahl.com/globalassets/productimages/7323652449587_f.jpg",
        "https://www.kappahl.com/globalassets/productimages/7323652449587_b.jpg",
      ],
    });

    await Product.create({
      name: "Rundhalsad t-shirt",
      description:
        "Enfärgad t-shirt i mjuk och lite kraftigare bomullskvalitet. Ett basplagg som är användbart vid alla tillfällen. T-shirt för herr som är kvalitetssäkrad och uppvisade på tåligt material, bra färgbeständighet och behöll formen bra i Testfaktas test av t-shirts 2024. Längd 72 cm storlek M. Innehåller 90% ekologisk bomull.",
      categoryId: menCategory._id,
      price: 199,
      images: [
        "https://static.kappahl.com/globalassets/productimages/7323652327148_f.jpg",
        "https://static.kappahl.com/globalassets/productimages/7323652327148_b.jpg",
      ],
    });
    console.log("✓ Products seeded: 2");
  }

  const stockCount = await Stock.countDocuments();
  if (stockCount === 0) {
    const carpenterProduct = await Product.findOne({ name: "Carpenter byxor" });
    const tshirtProduct = await Product.findOne({ name: "Rundhalsad t-shirt" });
    const sizeS = await Size.findOne({ value: 'S' });
    const sizeM = await Size.findOne({ value: 'M' });
    const sizeL = await Size.findOne({ value: 'L' });
    const sizeXL = await Size.findOne({ value: 'XL' });
    
    await Stock.insertMany([
      // Carpenter byxor
      {
        productId: carpenterProduct._id,
        sizeId: sizeM._id,
        color: 'Green',
        quantity: 5
      },
      {
        productId: carpenterProduct._id,
        sizeId: sizeL._id,
        color: 'Green',
        quantity: 2
      },
      {
        productId: carpenterProduct._id,
        sizeId: sizeXL._id,
        color: 'Green',
        quantity: 4
      },
      {
        productId: carpenterProduct._id,
        sizeId: sizeM._id,
        color: 'Beige',
        quantity: 1
      },
      {
        productId: carpenterProduct._id,
        sizeId: sizeL._id,
        color: 'Beige',
        quantity: 1
      },
      {
        productId: carpenterProduct._id,
        sizeId: sizeXL._id,
        color: 'Beige',
        quantity: 4
      },
      // T-shirt
      {
        productId: tshirtProduct._id,
        sizeId: sizeS._id,
        color: 'White',
        quantity: 15
      },
      {
        productId: tshirtProduct._id,
        sizeId: sizeM._id,
        color: 'White',
        quantity: 20
      }
    ]);
    console.log("✓ Stock seeded: 8 items");
  }

  if (productCount === 2) {
    const womenCategory = await Category.findOne({ name: "Women" });
    await Product.create({
      name: "Pyjamas",
      description:
        "Tvådelad pyjamas i mjuk och skön kvalitet. Rak ledig passform på byxor med resår i midjan och sidfickor. Lätt A-linje formad skjorta ger skön rörlighet och fin look. Längd pyjamasskjorta 67 cm i storlek S. Innerbenslängd pyjamasbyxor 75 cm i storlek S.",
      categoryId: womenCategory._id,
      price: 499,
      images: [
        "https://static.kappahl.com/globalassets/productimages/7323654396523_f.jpg",
        "https://static.kappahl.com/globalassets/productimages/7323654396523_b.jpg",
      ],
    });
    console.log("✓ Products seeded: 1 (Pyjamas added)");
  }
  
  if (stockCount === 8) {
    const pyjamasProduct = await Product.findOne({ name: "Pyjamas" });
    const sizeS = await Size.findOne({ value: 'S' });
    const sizeM = await Size.findOne({ value: 'M' });
    
    await Stock.insertMany([
      {
        productId: pyjamasProduct._id,
        sizeId: sizeS._id,
        color: 'Black',
        quantity: 12
      },
      {
        productId: pyjamasProduct._id,
        sizeId: sizeM._id,
        color: 'Black',
        quantity: 18
      }
    ]);
    console.log("✓ Stock seeded: 2 items (Pyjamas)");
  }

  console.log("✓ Seed completed successfully!");
}

await seedDB();