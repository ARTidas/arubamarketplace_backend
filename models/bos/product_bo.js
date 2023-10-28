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

    getProductsByName: async (search) => {
        try {
            const products = await productDao.getProductsByName(search);
            console.log("XXXXXXXXXXXX");
            console.log(products);
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
    }
};

module.exports = productBo;