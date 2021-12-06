class BingoNumber {
  constructor(value) {
    this.value = value;
    this.marked = false;
  }

  mark() {
    this.marked = true;
  }

  toString() {
    return this.value;
  }
}

module.exports.BingoNumber = BingoNumber;
