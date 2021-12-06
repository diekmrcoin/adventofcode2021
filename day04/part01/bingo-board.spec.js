const { BingoBoard } = require('./bingo-board');
describe('Bingo board suite', function () {
  it('Should generate board correctly', () => {
    const input = `57 80 91 40 12
62 36 72  0 20
55 60 25 92 96
14  2 17 18 86
 1  4 90 66 38`;
    const board = new BingoBoard(input);
    for (const row of board.numbers) {
      expect(row.length).toBe(5);
      for (const number of row) {
        expect(number.value).not.toContain(' ');
        expect(+number.value).toBeGreaterThanOrEqual(0);
        expect(+number.value).toBeLessThan(100);
      }
    }
    console.log(board.numbers);
  });
});
