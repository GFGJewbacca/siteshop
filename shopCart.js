import { inventory, songItem } from './inventory.js';
class shopCart {
  constructor(id) {
    this.cart = [];
    this.id = id;
  }

  inventorySearch(name) {
    //Searches through the inventory array for the item and returns an index number
    let i = inventory.findIndex((inventoryItem) => inventoryItem.name === name);
    if (i === -1) {
      //In case the item wasn't found
      return;
    }
    return i;
  }

  addToCart(name) {
    let item = this.inventorySearch(name); //Finds the item in the inventory
    this.cart[this.cart.length] = inventory[item];
    //Adds the item to the end of the cart
  }

  removeFromCart(name) {
    let i = this.cart.findIndex((cartItem) => cartItem.name === name);
    //Finds the item in the shopping cart and sets the index number
    if (i === -1) {
      //In case the item wasn't found
      return;
    }
    this.cart.splice(i, 1);
    //Removes the item from cart based on the index number
  }

  addCopies(item) {
    //Adds a copy to the item
    item.copies++;
  }

  removeCopies(item) {
    /*First checks to make sure there are two or more copies of the item 
    before removing a copy*/
    if (item.copies >= 2) {
      item.copies--;
    }
  }

  sumTotal() {
    /*Sums the total price of all items in the shopping cart based on
    the individual price of the item and the number of copies per item*/
    let sum = 0;
    this.cart.forEach((item) => {
      sum += item.price * item.copies;
    });
    return sum;
  }

  totalCopies() {
    //Returns the total number of copies in the shopping cart
    let copies = 0;
    this.cart.forEach((item) => {
      copies += item.copies;
    });
    return copies;
  }

  savings() {
    //Calculates the amount of money saved based on copies
    let discount = 0;
    let cartTotal = this.sumTotal();
    let copies = this.totalCopies();
    if (12 <= copies < 25) {
      discount = (cartTotal * 100) / 5;
    } else if (25 <= copies < 50) {
      discount = (cartTotal * 100) / 10;
    }
    return discount;
  }
}
export { shopCart, inventory, songItem };
