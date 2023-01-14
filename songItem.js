export class songItem {
  constructor(name, price, type, copies) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.copies = copies;
  }
  locate() {
    /*Returns a file path to the item based on name
      and what kind of piece it is; a solo piece, a choral piece
      or a collection of pieces*/
    let location = '';
    switch (this.type) {
      case 'solo':
        location = `Full scores/solo_pieces/${this.name}.pdf`;
        break;

      case 'choral':
        location = `Full scores/choral_pieces/${this.name}.pdf`;
        break;

      case 'collection':
        location = `Full scores/collections/${this.name}.zip`;
        break;
    }
    return location;
  }
}
