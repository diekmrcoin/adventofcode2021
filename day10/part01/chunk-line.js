class ChunkLine {
  /**
   * @param {string} chunk
   */
  constructor(chunk) {
    this.chunk = chunk.split("");
  }

  validate() {
    const opened = [];
    do {
      const char = this.chunk.shift();
      if (this.isOpenChar(char)) {
        opened.push(char);
        continue;
      }
      const lastOpened = opened.pop();
      if (char !== this.reverseChar(lastOpened)) {
        throw new Error(char);
      }
    } while (this.chunk.length > 0);
    return opened.length < 1;
  }

  isOpenChar(char) {
    return char === '(' || char === '<' || char === '{' || char === '[';
  }

  reverseChar(char) {
    switch (char) {
      case '(':
        return ')';
      case '{':
        return '}';
      case '[':
        return ']';
      case '<':
        return '>';
      default:
        throw new Error(`Invalid character: ${char}`);
    }
  }

  charScore(char) {
    switch (char) {
      case ')':
        return 3;
      case '}':
        return 57;
      case ']':
        return 1197;
      case '>':
        return 25137;
      default:
        throw new Error(`Invalid score character: ${char}`);
    }
  }
}

module.exports.ChunkLine = ChunkLine;
