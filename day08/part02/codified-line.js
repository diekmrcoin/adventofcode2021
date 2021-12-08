class CodifiedLine {
  constructor() {
    this.signals = {
      'a': [],
      'b': [],
      'c': [],
      'd': [],
      'e': [],
      'f': [],
      'g': [],
    };
  }

  setSignal(words) {
    this.add1(words.filter(w => w.length === 2)[0]);
    this.add7(words.filter(w => w.length === 3)[0]);
    this.add4(words.filter(w => w.length === 4)[0]);
    this.add8(words.filter(w => w.length === 7)[0]);
    this.add5(words.filter(w => w.length === 5));
    this.add6(words.filter(w => w.length === 6));
  }

  /**
   * @param {string} word
   * @returns {string}
   */
  getNumber(word) {
    if (word.length === 2) {
      return '1';
    }
    if (word.length === 3) {
      return '7';
    }
    if (word.length === 4) {
      return '4';
    }
    if (word.length === 7) {
      return '8';
    }
    if (word.length === 5) {
      // 2, 3 or 5
      const num2 = word.includes(this.signals.a) &&
        word.includes(this.signals.c) &&
        word.includes(this.signals.d) &&
        word.includes(this.signals.e) &&
        word.includes(this.signals.g);
      if (num2) {
        return '2';
      }
      const num3 = word.includes(this.signals.a) &&
        word.includes(this.signals.c) &&
        word.includes(this.signals.d) &&
        word.includes(this.signals.f) &&
        word.includes(this.signals.g);
      if (num3) {
        return '3';
      }
      return '5';
    }
    // 0, 6 or 9
    const num0 = word.includes(this.signals.a) &&
      word.includes(this.signals.b) &&
      word.includes(this.signals.c) &&
      word.includes(this.signals.e) &&
      word.includes(this.signals.f) &&
      word.includes(this.signals.g);
    if (num0) {
      return '0';
    }
    const num6 = word.includes(this.signals.a) &&
      word.includes(this.signals.b) &&
      word.includes(this.signals.d) &&
      word.includes(this.signals.e) &&
      word.includes(this.signals.f) &&
      word.includes(this.signals.g);
    if (num6) {
      return '6';
    }
    return '9';
  }

  add1(word) {
    const positions = ['c', 'f'];
    for (const position of positions) {
      this.signals[position] = [...word.split('')];
    }
  }

  add7(word) {
    let letterFound = '';
    for (const letter of word) {
      if (!this.signals.c.includes(letter))
        letterFound = letter;
    }
    this.signals.a = [letterFound];
  }

  add4(word) {
    let letterFounds = [];
    for (const letter of word) {
      if (!this.signals.c.includes(letter))
        letterFounds.push(letter);
    }
    this.signals.b = [...letterFounds];
    this.signals.d = [...letterFounds];
  }

  add8(word) {
    let letterFounds = [];
    for (const letter of word) {
      if (!this.signals.a.includes(letter) &&
        !this.signals.b.includes(letter) &&
        !this.signals.c.includes(letter))
        letterFounds.push(letter);
    }
    this.signals.e = [...letterFounds];
    this.signals.g = [...letterFounds];
  }

  add5(words) {
    const letterFounds = [];
    // get letter included in all words
    for (const word of words) {
      for (const letter of word) {
        if (words.every((word) => word.split('').some(l => l === letter))) {
          letterFounds.push(letter);
        }
      }
    }
    let letterFound = '';
    for (const letter of letterFounds) {
      if (!this.signals.a.includes(letter) &&
        !this.signals.c.includes(letter) &&
        !this.signals.e.includes(letter))
        letterFound = letter;
    }
    this.signals.d = [letterFound];
    const letterIndex = this.signals.b.findIndex(l => l === letterFound);
    this.signals.b.splice(letterIndex, 1);
  }

  add6(words) {
    let letterFounds = [];
    // get letter included in all words
    for (const word of words) {
      for (const letter of word) {
        if (words.every((word) => word.split('').some(l => l === letter))) {
          letterFounds.push(letter);
        }
      }
    }
    let letterFound = '';
    for (const letter of letterFounds) {
      if (!this.signals.a.includes(letter) &&
        !this.signals.b.includes(letter) &&
        !this.signals.d.includes(letter) &&
        !this.signals.e.includes(letter) &&
        !this.signals.g.includes(letter))
        letterFound = letter;
    }
    this.signals.f = [letterFound];
    let letterIndex = this.signals.c.findIndex(l => l === letterFound);
    this.signals.c.splice(letterIndex, 1);

    letterFounds = [];
    // get letter included in all words
    for (const word of words) {
      for (const letter of word) {
        if (words.every((word) => word.split('').some(l => l === letter))) {
          letterFounds.push(letter);
        }
      }
    }
    letterFound = '';
    for (const letter of letterFounds) {
      if (!this.signals.a.includes(letter) &&
        !this.signals.b.includes(letter) &&
        !this.signals.c.includes(letter) &&
        !this.signals.d.includes(letter) &&
        !this.signals.f.includes(letter))
        letterFound = letter;
    }
    this.signals.g = [letterFound];
    letterIndex = this.signals.e.findIndex(l => l === letterFound);
    this.signals.e.splice(letterIndex, 1);
  }

  /**
   * Input example: "abc"
   * Output example: ["cab", "cba", "acb", "abc", "bca", "bac"]
   * @param {string} word
   * @return {string[]}
   */
  permutations(word) {
    const results = [];

    function permute(arr, memo = []) {
      let cur;
      for (let i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur).join(''));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
      return results;
    }

    return permute(word.split(''));
  }
}

module.exports.CodifiedLine = CodifiedLine;
