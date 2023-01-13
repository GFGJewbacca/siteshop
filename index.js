// Import stylesheets
//import './style.css';
//import './modal.js';
import { shopCart } from './shopCart.js';

// Write Javascript code!

let shoppingCart = new shopCart();
shoppingCart.addToCart('Oseh Shalom', 'solo');
shoppingCart.addToCart('Shalom Rav', 'solo');
shoppingCart.addToCart('Oseh Shalom', 'choral');

$('#total-price').html(shoppingCart.salePrice());
$('#show-cart').on('click', '.plus', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.addCopies(name, part);
  shoppingCart.displayCart();
});
$('#show-cart').on('click', '.minus', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.removeCopies(name, part);
  shoppingCart.displayCart();
});
$('#show-cart').on('click', '.removeFromCart', function (event) {
  let name = $(this).data('name');
  let part = $(this).data('part');
  shoppingCart.removeFromCart(name, part);
  shoppingCart.displayCart();
});
$('#show-cart').html(shoppingCart.displayCart());
$('#savings').html(shoppingCart.savings());
