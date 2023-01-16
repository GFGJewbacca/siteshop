import { shopCart } from './shopCart.js';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
let shoppingCart = new shopCart();

//Triggers and events

/*Loading the cart
if (sessionStorage.getItem('shoppingCart') != null) {
  shoppingCart.loadCart();
}*/

//Adding copies
$('.plus').click(function () {
  let name = $(this).data('name');
  let type = $(this).data('type');
  shoppingCart.addCopies(name, type);
  shoppingCart.displayCart();
});
//Removing copies
$('.minus').click(function () {
  let name = $(this).data('name');
  let type = $(this).data('type');
  shoppingCart.removeCopies(name, type);
  shoppingCart.displayCart();
});
//Adding to the cart
$('.add-to-cart').click(function () {
  let name = $(this).data('name');
  let type = $(this).data('type');
  shoppingCart.addToCart(name, type);
  shoppingCart.displayCart();
});
//Removing from the cart
$('.remove').click(function () {
  let name = $(this).data('name');
  let type = $(this).data('type');
  shoppingCart.removeFromCart(name, type);
  shoppingCart.displayCart();
});

//Open&close the cart
$('#openCart').click(function () {
  $('#show-cart').slideToggle('slow');
});

//Displaying the necessary parts of the cart
$('#show-cart').html(shoppingCart.displayCart());
$('#savings').html(shoppingCart.savings());
$('#total-price').html(shoppingCart.salePrice());
