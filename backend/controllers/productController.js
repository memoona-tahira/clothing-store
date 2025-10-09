
// GET all products
export const getProducts = async (req, res) => {
  res.json({
    message: "get all products called",
  });
};

// Get one product by ID
export const getProductById = (req, res) => {
  res.json({
    message: "get by products called",
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
