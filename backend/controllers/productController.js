const productmodel = require('../model/product');

exports.getProducts = async (req, res, next) => {
  try {
    const query = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", // case-insensitive search
          },
        }
      : {}

    const products = await productmodel.find(query);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
