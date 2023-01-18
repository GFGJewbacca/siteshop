export class songItem {
  constructor(name, price, type, copies) {
    this.name = name;
    this.price = price;
    this.type = type; //Type of item - solo, choral or collection
    this.copies = copies;
  }

  locate() {
    /*Returns a file path to the item based on name
      and what type of item it is; a solo piece, a choral piece
      or a collection of pieces*/
    let location = '';
    if (this.type == 'collection') {
      location = `Full scores/${this.name}.zip`;
    } else {
      location = `Full scores/${this.name} - ${this.type}.pdf`;
    }
    return location;
  }
}
