class Ocean {
  /**
   * @param {number[]} lanternFish
   */
  constructor(lanternFish) {
    /**
     * @type {{[index:number]: number}}
     */
    this.lanternFish = {};
    for (const fish of lanternFish) {
      this.lanternFish[fish] = (this.lanternFish[fish] || 0) + 1;
    }
  }

  simulate() {
    const today = {};
    Object.keys(this.lanternFish).forEach((days) => {
      const birth = days - 1 < 0;
      const newDays = birth ? 6 : days - 1;
      today[newDays] = (today[newDays] || 0) + this.lanternFish[days];
      if (birth)
        today[8] = this.lanternFish[days];
    });
    this.lanternFish = today;
  }

  totalLanternFish() {
    return Object.values(this.lanternFish).reduce((a, b) => a + b, 0);
  }

}

module.exports.Ocean = Ocean;
