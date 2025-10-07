import express from "express";
import { getProducts,
  getProductById,
   createProduct ,
   updateProduct,
   deleteProduct

} from "../controllers/productController.js";

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

export default router;