import { shopCart } from './shopCart.js';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';

let shoppingCart = new shopCart();
//Making sure the page is ready before executing jQuery code
$(function () {
  //Triggers and events

  //Loading the cart
  if (sessionStorage.getItem('shoppingCart') != null) {
    shoppingCart.loadCart();
  }

  //Adding copies
  $('#show-cart').on('click', '.plus', function () {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.addCopies(name, type);
    displayCart();
  });
  //Removing copies
  $('#show-cart').on('click', '.minus', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.removeCopies(name, type);
    displayCart();
  });
  //Adding to the cart
  $('.add-to-cart').click(function () {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.addToCart(name, type);
    displayCart();
  });
  //Removing from the cart
  $('#show-cart').on('click', '.remove', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.removeFromCart(name, type);
    displayCart();
  });
  //Clearing the cart
  $('#show-cart').on('click', '#clear', function (event) {
    shoppingCart.clearCart();
    displayCart();
  });

  //Open&close the cart
  $('#openCart').click(function (event) {
    $('#show-cart').slideToggle('slow');
  });

  function displayCart() {
    /*Displays the cart as a table. Each table row has the item name, the price, the number of copies with buttons to add and remove copies, the item type and a remove from cart button. It then appends two buttons to clear the cart and checkout.*/
    let output = '';
    //Checks to see if there are items in the cart before displaying the table
    if (shoppingCart.cart.length === 0) {
      output = '<h3><i>Your cart is empty</i></h3>';
    } else {
      output =
        '<table id="cart-table"><th>Name</th><th>Price</th><th colspan="3">Copies</th><th>Type</th>';
      shoppingCart.cart.forEach((item) => {
        output +=
          '<tr>' +
          '<td>' +
          item.name +
          '</td>' +
          '<td>$' +
          item.price +
          '</td><td><button class="minus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">-</button></td><td>' +
          item.copies +
          '</td><td><button class="plus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">+</button></td>' +
          '<td>' +
          item.type +
          '</td>' +
          '<td><button class="remove" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">X</button></td>';
      });
      output +=
        '</table><br>You saved: <span id="savings"></span><br>' +
        'Total: <span id="total-price"></span><br>' +
        '<button id="clear">Clear cart</button>' +
        '<input type="submit" value="Checkout">';
    }
    //Displaying the necessary parts of the store
    $('#show-cart').html(output);
    $('#savings').html(shoppingCart.savings());
    $('#total-price').html(shoppingCart.salePrice());
    $('#total-copies').html(shoppingCart.totalCopies());
  }
  displayCart();
});
