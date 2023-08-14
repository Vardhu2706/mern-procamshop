import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const products = await Product.find({ ...keyword });
  res.json(products);
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

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
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

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc List products by category
// @route
const getProductsByCategory = asyncHandler(async (req, res) => {
  console.log(req.params);
  if (req.params.category === "all") {
    const products = await Product.find({});
    res.json(products);
  } else {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductsByCategory,
};
