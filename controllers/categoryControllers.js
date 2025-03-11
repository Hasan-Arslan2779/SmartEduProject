const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: 'succes',
      category,
    });
  } catch (error) {
    res.status(401).json({
      status: 'Fail',
      error,
    });
  }
};
