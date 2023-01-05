// Import stylesheets
import './style.css';
import { songItem, inventory, shopCart } from './shopCart.js';

// Write Javascript code!
let shoppingcart;
shoppingcart = new shopCart('shoppingcart');
shoppingcart.addToCart('Shalom_Rav');
shoppingcart.addToCart('Oseh_Shalom');
shoppingcart.addToCart(`T'filat_HaMakom_solo`);

const appDiv = document.getElementById('app');
//appDiv.innerHTML = shoppingcart.cart[0].copies;
