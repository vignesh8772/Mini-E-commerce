const productmodel = require('../model/product');

// GET PRODUCT BY ID - /api/v1/products/:id
const getProductsdetailId = async (req, res, next) => {
    try {
        // Check if keyword search is used
            const single = await productmodel.findById(req.params.id);

            return res.json({
                success: true,
                single:single,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = getProductsdetailId;
