export class songItem {
  constructor(name, price, part, copies) {
    this.name = name;
    this.price = price;
    this.part = part;
    this.copies = copies;
  }
  locate() {
    let location = '';
    switch (this.part) {
      case 'solo':
        location = `Full_scores/solo_pieces/${this.name}.pdf`;
        break;

      case 'choral':
        location = `Full_scores/choral_pieces/${this.name}.pdf`;
        break;

      case 'collection':
        location = `Full_scores/collections/${this.name}.zip`;
        break;
    }
    return location;
  }
}
