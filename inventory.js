import { shopItem } from './shopItem.js';
let inventory = [
  new shopItem('Ahavat Olam', 4.0, 'solo', 1)(),
  new shopItem('Barchu', 4.0, 'solo', 1),
  new shopItem(`L'cha Dodi`, 4.0, 'solo', 1),
  new shopItem(`L'chu N'ran'na`, 4.0, 'solo', 1),
  new shopItem(`Mi Chamocha`, 4.0, 'solo', 1),
  new shopItem(`Oseh Shalom`, 4.0, 'solo', 1),
  new shopItem(`Sh'ma`, 4.0, 'solo', 1),
  new shopItem(`Shalom Rav`, 4.0, 'solo', 1),
  new shopItem(`V'sham'ru`, 4.0, 'solo', 1),
  new shopItem(`Barchu`, 4.0, 'choral', 1),
  new shopItem(`Hal'luyah`, 4.0, 'choral', 1),
  new shopItem(`L'cha Dodi`, 4.0, 'choral', 1),
  new shopItem(`Oseh Shalom`, 4.0, 'choral', 1),
  new shopItem(`Pulled Under`, 4.0, 'choral', 1),
  new shopItem(`Shalom Rav`, 4.0, 'choral', 1),
  new shopItem(`Ufros Aleinu`, 4.0, 'choral', 1),
  new shopItem(`Choir pieces`, 25.0, 'collection', 1),
  new shopItem(`T'filat HaMakom solo`, 30.0, 'collection', 1),
  new shopItem(`T'filat HaMakom solo+choir`, 45.0, 'collection', 1),
];
export { inventory };
