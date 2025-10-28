
import Stock from "../models/inventoryModel.js"
// GET all products
const getProductInventory = async (req, res) => {
   console.log('req.params:', req.params);
    console.log('req.query:', req.query);
    console.log('Full URL:', req.originalUrl);
    

       const productid = req.params.id;
 


   const stockInDB = await Stock.find({productId : productid});

  res.json({
    message: "stock for product",

    stock: stockInDB,
    product: productid
    
  });
};
export default getProductInventory;
