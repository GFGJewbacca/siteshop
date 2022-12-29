// Import stylesheets
import './style.css';
import { songItem, inventory, shopCart } from './shopCart.js';

// Write Javascript code!
let shoppingcart;
shoppingcart = new shopCart('shoppingcart');
let item = shoppingcart.search('Oseh_Shalom');
shoppingcart.addToCart(item);
shoppingcart.removeFromCart(item);

const appDiv = document.getElementById('app');
appDiv.innerHTML = shoppingcart.cart[0].name;
