class Column {
  constructor() {
    this['0'] = 0;
    this['1'] = 0;
  }

  moreCommon() {
    return this['0'] > this['1'] ? '0' : '1';
  }

  lessCommon() {
    return this['0'] > this['1'] ? '1' : '0';
  }
}

module.exports.Column = Column;
