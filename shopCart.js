import { inventory, songItem } from './inventory.js';
let search = 0;
let cart = [];
search = (name) => {
  let i = 0;
  while (name != inventory[i].name) {
    i++;
  }
  return i;
};
