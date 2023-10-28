const AbstractDo = require("./abstract_do");

class userDo extends AbstractDo {
    constructor(email, password_hash) {
        this.email = email;
        this.password_hash = password_hash;
    }
};

module.exports = userDo;