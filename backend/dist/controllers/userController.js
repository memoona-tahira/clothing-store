"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
// GET all users
const getUsers = async (req, res) => {
    res.json({
        message: "get all users",
    });
};
exports.getUsers = getUsers;
// Get one user by ID
const getUserByID = (req, res) => {
    res.json({
        message: "get specific user",
    });
};
exports.getUserByID = getUserByID;
// Create new user
const createUser = (req, res) => {
    res.json({
        message: "create new user",
    });
};
exports.createUser = createUser;
// Update existing user
const updateUser = (req, res) => {
    res.json({
        message: "update user",
    });
};
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res) => {
    res.json({
        message: "delete user",
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map