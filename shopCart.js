import { inventory, songItem } from './inventory.js';
export class shopCart {
  constructor(id) {
    this.cart = [];
    this.id = id;
  }

  inventorySearch(name, type) {
    //Searches through the inventory array for the item and returns an index number
    let i = inventory.findIndex(
      (inventoryItem) =>
        inventoryItem.name === name && inventoryItem.type === type
    );
    //If item isn't found, returns "undefined" instead of -1
    if (i === -1) {
      return;
    }
    return i;
  }

  cartSearch(name, type) {
    //Finds the item in the shopping cart and returns the index number
    let i = this.cart.findIndex(
      (cartItem) => cartItem.name === name && cartItem.type === type
    );

    return i;
    //If item isn't found, returns -1
  }

  addToCart(name, type) {
    let item = this.inventorySearch(name, type); //Finds the item in the inventory
    //Check to see if the item is already in the cart
    if (this.cartSearch(inventory[item].name, inventory[item].type) != -1) {
      alert('The item is already in the cart');
    } else {
      this.cart.push(inventory[item]); //Adds the item to the cart
      this.saveCart();
    }
  }

  removeFromCart(name, type) {
    let item = this.cartSearch(name, type); //Finds the item in the cart
    this.cart.splice(item, 1);
    //Removes the item from cart based on the index number
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    //Clears the cart and resets it.
    this.saveCart();
  }

  addCopies(name, type) {
    //Adds a copy of the piece in the cart
    let item = this.cartSearch(name, type);
    this.cart[item].copies++;
    this.saveCart();
  }

  removeCopies(name, type) {
    /*First checks to make sure there are two or more copies of the item 
    before removing a copy*/
    let item = this.cartSearch(name, type);
    if (this.cart[item].copies >= 2) {
      this.cart[item].copies--;
    }
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
    /*Calculates the amount of money saved based on
    the number of copies in the cart and returns the value*/
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
    //Returns the total sale price by subtracting the discount from the total
    let salePrice = this.sumTotal() - this.savings();
    salePrice = salePrice.toFixed(2);
    //Trim the sale price to be a neat dollar value
    return salePrice;
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
