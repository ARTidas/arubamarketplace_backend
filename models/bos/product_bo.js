const Product = require('./product_do'); // Import the data object
const productDao = require('./product_dao');

const productBo = {
    createProduct: (id, title, description, price) => {
        // Add any business logic or validation here
        return new Product(id, title, description, price);
    },

    getProductById: async (id) => {
        try {
           const product = await productDao.searchProductById(id);
           return product;
        } catch (error) {
           throw error;
        }
    }
};

module.exports = productBo;