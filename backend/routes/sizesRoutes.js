import express from "express";
const router = express.Router();

import getAllSizes from "../controllers/sizesController.js"



router.route("/").get(getAllSizes);

export default router;