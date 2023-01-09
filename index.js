// Import stylesheets
import './style.css';
import { shopCart } from './shopCart.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';

// Write Javascript code!
const shopper = new shopCart();
shopper.addToCart('Oseh_Shalom');
shopper.addToCart(`L'cha_Dodi`);
document.getElementById('display').innerHTML =
  '<table>' + shopper.displayCart();
+'</table>';
