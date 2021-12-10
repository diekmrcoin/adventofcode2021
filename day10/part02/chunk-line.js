class ChunkLine {
  /**
   * @param {string} chunk
   */
  constructor(chunk) {
    this.chunk = chunk;
    this.opened = [];
  }

  validate() {
    let score = 0;
    this.chunk.split('').some((char) => {
      if (this.isOpeningChr(char)) this.opened.push(char);
      else {
        if (this.opened.pop() !== this.reverseChar(char)) {
          return score += this.badInputScore(char);
        }
      }
    });
    return score;
  }

  isOpeningChr(char) {
    return '([{<'.includes(char);
  }

  reverseChar(char) {
    switch (char) {
      case '(':
        return ')';
      case ')':
        return '(';
      case '{':
        return '}';
      case '}':
        return '{';
      case '[':
        return ']';
      case ']':
        return '[';
      case '<':
        return '>';
      case '>':
        return '<';
      default:
        throw new Error(`Invalid character: ${char}`);
    }
  }

  badInputScore(char) {
    switch (char) {
      case ')':
        return 3;
      case ']':
        return 57;
      case '}':
        return 1197;
      case '>':
        return 25137;
      default:
        throw new Error(`Invalid score character: ${char}`);
    }
  }

  badOpeningScore(char) {
    return {
      '(': 1,
      '[': 2,
      '{': 3,
      '<': 4,
    }[char];
  }
}

module.exports.ChunkLine = ChunkLine;
