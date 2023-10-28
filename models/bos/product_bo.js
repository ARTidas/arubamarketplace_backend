const productDo = require('../dos/product_do'); // Import the data object
const productDao = require('../daos/product_dao');

const productBo = {
    getProducts: async () => {
        try {
            const product = await productDao.getProducts();
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
    },

    getProductsByName: async (searchTerm) => {
        try {
            const products = await productDao.getProductsByName(searchTerm);
            return products;
        } catch (error) {
            throw error;
        }
    },

    getProductsByCategoryName: async (categoryName) => {
        try {
            const products = await productDao.getProductsByCategoryName(categoryName);
            return products;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = productBo;