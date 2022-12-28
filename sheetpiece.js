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
          part = Number(this.part)
          switch (part) {
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
}