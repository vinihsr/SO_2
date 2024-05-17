export default class Items {
  constructor(nameItem, photo, descriptionItem, price, sell_price, amount, minimum_stock, category, location) {
    this.nameItem = nameItem;
    this.photo = photo;
    this.descriptionItem = descriptionItem;
    this.price = price;
    this.sell_price = sell_price;
    this.amount = amount;
    this.minimum_stock = minimum_stock;
    this.category = category;
    this.location = location;
  }
}
