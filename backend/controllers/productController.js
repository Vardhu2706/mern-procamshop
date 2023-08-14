import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products_top_rated = await Product.find();
  const products_new = await Product.find({});
  res.json(products_top_rated);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource not found");
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private && Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Sample Product name",
    image: "public/images/sample.jpg",
    showcase: [],
    features: {},
    subCategory: "Sample Sub Category",
    brand: "Sample brand",
    category: "Sample Brand",
    price: 0,
    countInStock: 0,
    rating: 5,
    numReviews: 0,
    featured: false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private && Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    showcase,
    features,
    subCategory,
    category,
    brand,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.image = image),
      (product.showcase = showcase),
      (product.features = features),
      (product.subCategory = subCategory),
      (product.category = category),
      (product.brand = brand),
      (product.price = price),
      (product.countInStock = countInStock),
      (product.rating = rating),
      (product.numReviews = numReviews);

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Can't find product");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
