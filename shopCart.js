import { inventory, songItem } from './inventory.js';
export class shopCart {
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
    this.cart.push(inventory[item]);
    this.saveCart();
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
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    //Clears the cart and resets it.
    this.saveCart();
  }

  sumTotal() {
    /*Sums the total price of all items in the shopping cart based on
    the individual price of the item and the number of copies per item*/
    let sum = 0;
    this.cart.forEach((item) => {
      sum += item.price * item.copies;
    });
    sum = sum.toFixed(2); //Trim the sum to be a neat dollar value
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
    if (copies >= 12 && copies < 25) {
      discount = (cartTotal / 100) * 5;
      //5% discount between 12 and 24 copies
    } else if (copies >= 25 && copies < 50) {
      discount = (cartTotal / 100) * 10;
      //10% discount between 25 and 49 copies
    } else if (copies >= 50 && copies < 100) {
      discount = (cartTotal / 100) * 15;
      //15% discount between 50 and 99 copies
    } else if (copies >= 100) {
      discount = (cartTotal / 100) * 20;
      //20% discount at 100+ copies
    }
    discount = discount.toFixed(2); //Trim the discount to be a neat dollar value
    return discount;
  }

  salePrice() {
    let salePrice = this.sumTotal() - this.savings();
    salePrice = salePrice.toFixed(2);
    //Trim the sale price to be a neat dollar value
    return salePrice;
  }

  displayCart() {
    let output = '<table>';
    this.cart.forEach((item) => {
      output +=
        '<tr>' +
        '<td> Name: ' +
        item.name +
        '</td>' +
        '<td> Price: $' +
        item.price +
        '</td><td><button>+</button> ' +
        item.copies;
    });
    return output + '<table>';
  }

  // Save cart
  saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(this.cart));
  }

  // Load cart
  loadCart() {
    this.cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
}
