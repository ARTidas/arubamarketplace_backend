const productDo = require('../dos/product_do'); // Import the data object
const productDao = require('../daos/product_dao');

const productBo = {
    getProducts: async (products) => {
        try {
            const product = await productDao.getProducts(id);
            return product;
        } catch (error) {
            throw error;
        }
    },
    
    createProduct: (id, title, description, price) => {
        // Add any business logic or validation here
        return new Product(id, title, description, price);
    },

    getProductById: async (id) => {
        try {
           const product = await productDao.getProductById(id);
           return product;
        } catch (error) {
           throw error;
        }
    }
};

module.exports = productBo;