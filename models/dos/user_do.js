// Create an object template for user data

let UserDo = AbstractDo.extend({
    id: null,           // User ID
    user_name: '',      // User's username
    password_hash: '',  // Hashed password
    is_admin: false,    // Whether the user is an admin
    owned_products: [], // An array of the user's products
    balance: 0          // User's account balance
});