export class sheetpiece {
  constructor(name, price, part) {
      this.name = name;
      this.price = price;
      this.part = part;
  }
  locate () {
      let location = "";
      if (this.part == "solo") {
         location = `Full_scores/solo_pieces/${this.name}`;
      }
      else {
          switch (this.part) {
              case 4:
                  location = `Full_scores/choral_pieces/${this.name}/${this.name}_four.pdf`;
                  break;
              case 8:
                  location = `Full_scores/choral_pieces/${this.name}/${this.name}_eight.pdf`;
                  break;
              case 16:
                  location = `Full_scores/choral_pieces/${this.name}/${this.name}_sixteen.pdf`;
                  break;
              case 25:
                  location = `Full_scores/choral_pieces/${this.name}/${this.name}_twenty_five.pdf`;
                  break;
              case 50:
                  location = `Full_scores/choral_pieces/${this.name}/${this.name}_fifty.pdf`;
                  break;
              case 100:
                  location = `Full_scores/choral_pieces/${this.name}/${this.name}_hundred.pdf`;
                  break;
          }
      }
      return location;
  }
  priceset() {
    if (this.part == "solo") {
    return this.price;
    }
    else {
      switch (this.part) {
      case 4:
        this.price = 16;
        break;
      case 8:
        this.price = 30;
        break;
      case 16:
        this.price = 60;
        break;
      case 25:
        this.price = 90;
        break;
      case 50:
        this.price = 180;
        break;
      case 100:
        this.price = 350;
        break
      }
      return this.price;
    }
  }
}