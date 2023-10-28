const AbstractDo = require('./abstract_do');

class productDo extends AbstractDo {
  constructor(id, title, price, category, description, owners, img) {
    super();
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
    this.owners = owners;
    this.owners = owners;
    this.img = img;
  }
}

module.exports = productDo;