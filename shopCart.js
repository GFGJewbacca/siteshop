import { inventory, songItem } from './inventory.js';
class shopCart {
  constructor(id) {
    this.cart = [];
    this.id = id;
  }

  search(name) {
    let i = 0;
    while (name != inventory[i].name) {
      i++;
    }
    return i;
  }

  addToCart(item) {
    this.cart[this.cart.length] = inventory[item];
  }

  removeFromCart(item) {
    let i = 0;
    while (item.name != this.cart[i].name) {
      i++;
    }
    switch (i) {
      case 0:
        this.cart.shift();
        break;

      case this.cart.length:
        this.cart.pop();
        break;

      default:
        const beforeItem = this.cart.splice(0, i);
        const afterItem = this.cart.splice(i + 1, this.cart.length);
        this.cart = beforeItem.concat(afterItem);
        break;
    }
  }
}
export { shopCart, inventory, songItem };
