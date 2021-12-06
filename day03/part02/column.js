class Column {
  constructor() {
    this['0'] = 0;
    this['1'] = 0;
  }

  moreCommon(predominant = '1') {
    if (this['0'] === this['1']) {
      return predominant;
    }
    return this['0'] > this['1'] ? '0' : '1';
  }

  lessCommon(predominant = '1') {
    if (this['0'] === this['1']) {
      return predominant;
    }
    return this['0'] > this['1'] ? '1' : '0';
  }
}

module.exports.Column = Column;
