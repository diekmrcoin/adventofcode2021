class ChunkLine {
  /**
   * @param {string} chunk
   */
  constructor(chunk) {
    this.chunk = chunk;
  }

  validate() {
    const opened = [];
    let score = 0;
    this.chunk.split('').some((char) => {
      if (this.isOpeningChr(char)) opened.push(char);
      else {
        if (opened.pop() !== this.reverseChar(char)) {
          return score += this.charScore(char);
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

  charScore(char) {
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
}

module.exports.ChunkLine = ChunkLine;
