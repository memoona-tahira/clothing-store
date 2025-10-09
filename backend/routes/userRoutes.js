
import express from "express";
import { getUsers,
    getUserByID,
    createUser ,
    updateUser ,
    deleteUser ,
} from "../controllers/userController.js";

const router = express.Router();

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:id')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser);

export default router;
