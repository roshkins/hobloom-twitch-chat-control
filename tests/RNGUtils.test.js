const RNGUtils = require("../lib/RNGUtils");

test("Random number is less than max, and greater than or equal to min", () => {
<<<<<<< HEAD
  var min = -1000;
  var max = 1000;

  for (var i = 0; i < 50; i++) {
      expect(RNGUtils.getRandom(min, max)).toBeGreaterThanOrEqual(min);
      expect(RNGUtils.getRandom(min, max)).toBeLessThan(max);
  }
=======
    var min = -1000;
    var max = 1000;

    for (var i = 0; i < 50; i++) {
      expect(RNGUtils.getRandom(min, max)).toBeGreaterThanOrEqual(min);
      expect(RNGUtils.getRandom(min, max)).toBeLessThanOrEqual(max);
    }

    var min = 1;
    var max = 2;
    for (var i = 0; i < 10; i++) {
        expect(RNGUtils.getRandom(min, max)).toBeGreaterThanOrEqual(min);
        expect(RNGUtils.getRandom(min, max)).toBeLessThanOrEqual(max);
    }
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
});
