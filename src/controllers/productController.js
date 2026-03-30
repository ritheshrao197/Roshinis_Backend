
const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const products = await Product.find({ $text: { $search: q } }).lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Product name is required' });
    }
    if (price === undefined || price === null || Number(price) <= 0) {
      return res.status(400).json({ message: 'A valid selling price (>0) is required' });
    }
    if (stock === undefined || stock === null || Number(stock) < 0) {
      return res.status(400).json({ message: 'Stock must be 0 or greater' });
    }

    const product = await Product.create({
      ...req.body,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      updatedAt: new Date(),
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ message: 'Product name cannot be empty' });
    }
    if (price !== undefined && Number(price) <= 0) {
      return res.status(400).json({ message: 'Selling price must be greater than 0' });
    }
    if (stock !== undefined && Number(stock) < 0) {
      return res.status(400).json({ message: 'Stock must be 0 or greater' });
    }

    const updateData = { ...req.body, updatedAt: new Date() };
    if (name) updateData.name = name.trim();

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
