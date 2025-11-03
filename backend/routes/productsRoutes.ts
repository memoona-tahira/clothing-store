import express from "express";
import { getProducts,
  getProductById,
   createProduct ,
   updateProduct,
   deleteProduct

} from "../controllers/productController.js";
import getProductInventory from "../controllers/inventoryController.js"

const router = express.Router();

//router.get("/", getProducts);
//router.post("/", createProduct);

router.route('/')
  .get(getProducts)
  .post(createProduct);
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.route('/:id/stock').get(getProductInventory);

export default router;