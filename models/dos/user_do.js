const AbstractDo = require("./abstract_do");

class userDo extends AbstractDo {
    constructor(id, email, password_hash, is_active, created_at, is_admin, owned_products_id, balance, updated_at) {
        this.id = id;
        this.email = email;
        this.password_hash = password_hash;
        this.is_active = is_active;
        this.created_at = created_at;
        this.is_admin = is_admin;
        this.owned_products_id = owned_products_id;
        this.balance = balance;
        this.updated_at = updated_at;
    }
};

module.exports = userDo;