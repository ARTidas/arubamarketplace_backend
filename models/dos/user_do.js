const AbstractDo = require("./abstract_do");

class UserDo extends AbstractDo {
    constructor(id, email, is_admin, owned_products, balance) {
        this.id = id;
        this.email = email;
        this.is_admin = is_admin;
        this.owned_products = owned_products;
        this.balance = balance;
    }
};