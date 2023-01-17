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
  $('#clear').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });

  //Open&close the cart
  $('#openCart').click(function (event) {
    $('#show-cart').slideToggle('slow');
  });

  //Makes the discount more visible in the cart when active

  function displayCart() {
    /*Displays the cart as a table. Each table row has the item name, the price, the number of copies with buttons to add and remove copies, the item type and a remove from cart button. It then appends two buttons to clear the cart and checkout.*/
    let output = '';
    let percentOff = '';
    let copies = shoppingCart.totalCopies();
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
          '<td class="cartitem">' +
          item.name +
          '</td>' +
          //Second in the row - item price
          '<td class="cartitem">$' +
          item.price +
          '</td>' +
          //Third in the row - remove copies button
          '<td class="cartitem"><button class="minus" data-name="' +
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
          '<td class="cartitem"><button class="plus" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">+</button></td>' +
          '<td class="cartitem">' + // Sixth in the row - item type
          item.type +
          '</td>' +
          //Seventh in the row - remove item button
          '<td class="cartitem"><button class="remove" data-name="' +
          item.name +
          '" data-type="' +
          item.type +
          '">X</button></td>';
      });
      /*CLosing up the table, displaying number of copies,
      savings, total price, and a checkout button */
      output +=
        '</table><br><span class="cartEnder">Copies: </span>' +
        '<span id="total-copies"></span><br>' +
        '<span class="cartEnder">You saved: </span>' +
        '<span id="savings"></span> ' +
        '<span id="percentOff" class="important"></span> <br>' +
        '<span class="cartEnder">Total: </span>' +
        '<span id="total-price"></span><br>' +
        '<input type="submit" id="checkout" value="Checkout">';

      /*Displays the percentage the user is saving based on number of
        the number of copies in the cart*/
      if (copies >= 12 && copies < 25) {
        //5% discount between 12 and 24 copies
        percentOff = '5% discount';
      } else if (copies >= 25 && copies < 50) {
        //10% discount between 25 and 49 copies
        percentOff = '10% discount';
      } else if (copies >= 50 && copies < 100) {
        //15% discount between 50 and 99 copies
        percentOff = '15% discount';
      } else if (copies >= 100) {
        //20% discount at 100+ copies
        percentOff = '20% discount';
      }
    }
    //Displaying the necessary parts of the store
    $('#show-cart').html(output);
    $('#savings').html(shoppingCart.savings());
    $('#total-price').html(shoppingCart.salePrice());
    $('#total-items').html(shoppingCart.cart.length);
    $('#total-copies').html(shoppingCart.totalCopies());
    $('#percentOff').html(percentOff);
  }
  //Makes sure the cart always displays.
  displayCart();
});
