const AbstractDo = require("./abstract_do");

class userDo extends AbstractDo {
    constructor(email, password_hash, owned_products_id) {
        this.email = email;
        this.password_hash = password_hash;
        this.owned_products_id = owned_products_id;
    }
};

module.exports = userDo;