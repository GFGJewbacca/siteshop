import { shopCart } from './shopCart.js';

let shoppingCart = new shopCart();
//Making sure the page is ready before executing jQuery code
$(function () {
  //Triggers and events

  //Loading the cart
  if (sessionStorage.getItem('shoppingCart') != null) {
    shoppingCart.loadCart();
  }

  //+1 copies
  $('#show-cart').on('click', '.plus', function () {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.addCopies(name, type);
    displayCart();
  });
  //-1 copies
  $('#show-cart').on('click', '.minus', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    shoppingCart.removeCopies(name, type);
    displayCart();
  });
  //Setting a number of copies to an item
  $('#show-cart').on('change', '.set', function (event) {
    let name = $(this).data('name');
    let type = $(this).data('type');
    let copies = Number($(this).val());
    shoppingCart.setCopies(name, type, copies);
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
      //Setting up the table and headers: Name, Price, Copies and Type
      output =
        '<table id="cart-table"><th>Name</th><th>Price</th><th colspan="3">Copies</th><th>Type</th>';
      shoppingCart.cart.forEach((item) => {
        output +=
          //First in the row - name
          '<tr>' +
          '<td>' +
          item.name +
          '</td>' +
          //Second in the row - item price
          '<td>$' +
          item.price +
          '</td>' +
          //Third in the row - remove copies button
          '<td><button class="minus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">-</button></td><td>' +
          //Fourth in the row - number of copies form input
          '<input type=number class="set" size="5" min="1" value="' +
          item.copies +
          '" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '"></td>' +
          //Fifth in the row - add copies button
          '<td><button class="plus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">+</button></td>' +
          '<td>' + // Sixth in the row - item type
          item.type +
          '</td>' +
          //Seventh in the row - remove item button
          '<td><button class="remove" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">X</button></td>';
      });
      /*CLosing up the table, displaying savings, total price, button for
      clearing the cart and a checkout button */
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
    $('#total-items').html(shoppingCart.cart.length);
  }
  //Makes sure the cart always displays.
  displayCart();
});
