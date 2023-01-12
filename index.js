// Import stylesheets
//import './style.css';
//import './modal.js';
//import './shopScript.js';
import { shopCart } from './shopCart.js';

// Write Javascript code!
let appDIV = document.getElementById('tester');
let shoppingCart = new shopCart();
shoppingCart.addToCart('Oseh_Shalom');
shoppingCart.addToCart('Shalom_Rav');
appDIV.innerHTML = shoppingCart.displayCart();
