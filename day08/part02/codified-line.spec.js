const { CodifiedLine } = require('./codified-line');

describe('Codified line suite', function () {
  /**
   * @type {CodifiedLine}
   */
  let codifiedLine;

  beforeEach(() => {
    codifiedLine = new CodifiedLine();
  });

  it('Should return the permutations of abc', () => {
    expect(codifiedLine.permutations('abc')).toEqual(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
  });

  it('Should return the permutations of cb', () => {
    expect(codifiedLine.permutations('cb')).toEqual(['cb', 'bc']);
  });

  it('Should add signal for number 1', () => {
    codifiedLine.add1('cg');
    console.log(codifiedLine.signals);
    expect(codifiedLine.signals.c).toEqual(['c', 'g']);
    expect(codifiedLine.signals.f).toEqual(['c', 'g']);
  });

  it('Should add 4 signals', () => {
    const words = 'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb'.split(' ');
    codifiedLine.add1(words.filter(w => w.length === 2)[0]);
    codifiedLine.add7(words.filter(w => w.length === 3)[0]);
    codifiedLine.add4(words.filter(w => w.length === 4)[0]);
    codifiedLine.add8(words.filter(w => w.length === 7)[0]);
    codifiedLine.add5(words.filter(w => w.length === 5));
    codifiedLine.add6(words.filter(w => w.length === 6));
    expect(codifiedLine.getNumber('be')).toBe(1);
    expect(codifiedLine.getNumber('cfbegad')).toBe(8);
    expect(codifiedLine.getNumber('edb')).toBe(7);
    expect(codifiedLine.getNumber('cgeb')).toBe(4);
  });
});
