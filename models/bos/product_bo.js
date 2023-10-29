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

    getProductById: async (id) => {
        try {
           const product = await productDao.getProductById(id);
           return product;
        } catch (error) {
           throw error;
        }
    },

    getProductsByName: async (search) => {
        try {
            const products = await productDao.getProductsByName(search);
            return products;
        } catch (error) {
            throw error;
        }
    },

    getProductsByCategoryName: async (category) => {
        try {
            const products = await productDao.getProductsByCategoryName(category);
            return products;
        } catch (error) {
            throw error;
        }
    },

    getUniqueCategoryNames: async () => {
        try {
            const categories = await productDao.getUniqueCategoryNames();
            return categories;
        } catch (error) {
            throw error;
        }
    },

    createProduct: async (title, price, description, owners, img) => {
        try {
            const productId = await productDao.createProduct(title, price, description, owners, img);
            return productId;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = productBo;