// Import stylesheets
import './style.css';
import { songItem, inventory, shopCart } from './shopCart.js';

// Write Javascript code!
let shoppingcart;
shoppingcart = new shopCart('shoppingcart');
shoppingcart.addToCart('Shalom_Rav');
shoppingcart.addToCart('Oseh_Shalom');
shoppingcart.addToCart(`T'filat_HaMakom_solo`);
shoppingcart.cart[0].copies = 4;
shoppingcart.cart[1].copies = 4;
shoppingcart.cart[2].copies = 0;

const appDiv = document.getElementById('app');
const appTester = document.getElementById('tester');
const appPercent = document.getElementById('percent');
appDiv.innerHTML = shoppingcart.sumTotal();
appTester.innerHTML = shoppingcart.salePrice();
appPercent.innerHTML = shoppingcart.savings();
