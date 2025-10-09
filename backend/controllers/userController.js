
// GET all users
export const getUsers = async (req , res) =>{
    res.json({
        message:"get all users",
    });
};

// Get one user by ID
export const getUserByID = (req ,res) =>{
   res.json({
        message: "get specific user",
    });
};

// Create new user
export const createUser = (req , res) => {
    res.json({
        message: "create new user",
    });
};

// Update existing user
export const updateUser =(req , res) => {
    res.json({
        message: "update user",
    });
};

// Delete a user
export const deleteUser = (req , res) => {
    res.json({
        message: "delete user",
    });
};