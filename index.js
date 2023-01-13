// Import stylesheets
//import './style.css';
//import './modal.js';
import { shopCart } from './shopCart.js';

// Write Javascript code!
let appDIV = document.getElementById('tester');
let shoppingCart = new shopCart();
shoppingCart.addToCart('Oseh Shalom');
shoppingCart.addToCart('Shalom Rav');

$('#show-cart').html(shoppingCart.displayCart());
$('#total-price').html(shoppingCart.salePrice());
$('#show-cart').on('click', '.plus', function (event) {
  let name = $(this).data('name');
  shoppingCart.addCopies(name);
  shoppingCart.displayCart();
});
