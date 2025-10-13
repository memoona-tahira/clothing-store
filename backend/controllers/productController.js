import Product from "../models/productModel.js"
import Category from "../models/categoryModel.js"
// GET all products
export const getProducts = async (req, res) => {

  // get category valuee from req e.g. ?category=Men
  const categoryName = req.query.catagory;

  // use it  get catagory id
   const categoryFromDB = await Category.findOne({name : categoryName});
   console.log(categoryFromDB)
    // If category is provided in query, add it to filter


    if (categoryFromDB == null) {
     return res.status(400).json({
        error : "wrong catagory"
      });
    }

      // is this if following find
      
 
let productsFromDB = [];

   productsFromDB = await Product.find({categoryId : categoryFromDB._id});
  res.json({
    message: "get all products called",

    count: productsFromDB.length,
    products: productsFromDB
    
  });
};

// Get one product by ID
export const getProductById = async (req, res) => {


 const productFromDB = await Product.findById( req.params.id); 
  res.json({
    message: "get all products",
    product:productFromDB
  });
};

// Create new product
export const createProduct = (req, res) => {
  res.json({
    message: "create products called",
  });
};

// Update existing product
export const updateProduct = (req, res) => {
  res.json({
    message: "update products called",
  });
};

// Delete a product
export const deleteProduct = (req, res) => {
  res.json({
    
    message: "delet products called",
  });
};
