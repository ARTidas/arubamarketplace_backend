const AbstractDo = require('./abstract_do');

class Product extends AbstractDo {
  constructor(id, title, description, price) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

module.exports = Product;