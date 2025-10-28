import { response } from "express";
import Size from "../models/sizeModel.js"

const getAllSizes = async (req, res) => {
   const s = await Size.find();

   res.json({
     sizes: s
   }
   
   );
}

export default getAllSizes;

