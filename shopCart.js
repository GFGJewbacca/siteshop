import { inventory, songItem } from './inventory.js';

let cart = [];

function inventorySearch(name) {
  //Searches through the inventory array for the item and returns an index number
  let i = inventory.findIndex((inventoryItem) => inventoryItem.name === name);
  if (i === -1) {
    //In case the item wasn't found
    return;
  }
  return i;
}

function addToCart(name) {
  let item = inventorySearch(name); //Finds the item in the inventory
  cart[cart.length] = inventory[item];
  saveCart();
  //Adds the item to the end of the cart
}

function removeFromCart(name) {
  let i = cart.findIndex((cartItem) => cartItem.name === name);
  //Finds the item in the shopping cart and sets the index number
  if (i === -1) {
    //In case the item wasn't found
    return;
  }
  cart.splice(i, 1);
  //Removes the item from cart based on the index number
  saveCart();
}

function clearCart() {
  cart = [];
  //Clears the cart and resets it.
  saveCart();
}

function addCopies(item) {
  //Adds a copy to the item
  item.copies++;
  saveCart();
}

function removeCopies(item) {
  /*First checks to make sure there are two or more copies of the item 
    before removing a copy*/
  if (item.copies >= 2) {
    item.copies--;
    saveCart();
  }
}

function sumTotal() {
  /*Sums the total price of all items in the shopping cart based on
    the individual price of the item and the number of copies per item*/
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.copies;
  });
  sum = sum.toFixed(2); //Trim the sum to be a neat dollar value
  return sum;
}

function totalCopies() {
  //Returns the total number of copies in the shopping cart
  let copies = 0;
  cart.forEach((item) => {
    copies += item.copies;
  });
  return copies;
}

function savings() {
  //Calculates the amount of money saved based on copies
  let discount = 0;
  let cartTotal = sumTotal();
  let copies = totalCopies();
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

function salePrice() {
  let salePrice = sumTotal() - savings();
  salePrice = salePrice.toFixed(2);
  //Trim the sale price to be a neat dollar value
  return salePrice;
}

function displayCart() {
  let output = '';
  for (let i in cart) {
    output +=
      '<tr>' +
      '<td>' +
      cart[i].name +
      '</td>' +
      '<td>(' +
      cart[i].price +
      ')</td>' +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" +
      cart[i].name +
      '>-</button>' +
      "<input type='number' class='item-count form-control' data-name='" +
      cart[i].name +
      "' value='" +
      cart[i].copies +
      "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" +
      cart[i].name +
      '>+</button></div></td>' +
      "<td><button class='delete-item btn btn-danger' data-name=" +
      cart[i].name +
      '>X</button></td>' +
      ' = ' +
      '<td>' +
      sumTotal() +
      '</td>' +
      '</tr>';
  }
}
// Save cart
function saveCart() {
  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Load cart
function loadCart() {
  cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}
if (sessionStorage.getItem('shoppingCart') != null) {
  loadCart();
}
