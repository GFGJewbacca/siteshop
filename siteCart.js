import { shopCart } from './shopCart.js';

let shoppingCart = new shopCart();

//Triggers and events

//Adding copies
$('#show-cart').on('click', '.plus', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.addCopies(name, part);
  shoppingCart.displayCart();
});
//Removing copies
$('#show-cart').on('click', '.minus', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.removeCopies(name, part);
  shoppingCart.displayCart();
});
//Adding to the cart
$('#show-cart').on('click', '.addToCart', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.addToCart(name, part);
  shoppingCart.displayCart();
});
//Removing from the cart
$('#show-cart').on('click', '.remove', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.removeFromCart(name, part);
  shoppingCart.displayCart();
});

//Displaying the necessary parts of the cart
$('#show-cart').html(shoppingCart.displayCart());
$('#savings').html(shoppingCart.savings());
$('#total-price').html(shoppingCart.salePrice());
