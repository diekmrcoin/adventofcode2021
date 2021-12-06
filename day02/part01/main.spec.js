const { Point } = require('./point');
const path = require('path');
describe('Day 2 suite', function () {
  describe('Point', function () {
    let point;
    beforeEach(() => {
      point = new Point(0, 0);
    });
    it('should be able to move right', () => {
      point.move('forward', 1);
      expect(point.x).toBe(1);
    });
  });
  describe('Input', function () {
    it('Should be able to read input', function () {
      const input = require('fs').readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
      expect(input).toBeDefined();
      for (let i = 0; i < input.length; i++) {
        if (!input[i]) continue;
        expect(input[i]).toBeDefined();
        const separated = input[i].split(' ');
        expect(separated.length).toBe(2);
      }
    });
  });
});
