const {expect} = require('chai');
const {plumages, speeds} = require('../src/birds');

describe('birds', function () {
  it('returns plumages for all kinds of birds', function() {
    const birds = [
      {name: 'anEuropeanSwallow', type: 'EuropeanSwallow'},
      {name: 'anAfricanSwallow', type: 'AfricanSwallow', numberOfCoconuts: 2},
      {name: 'aTiredAfricanSwallow', type: 'AfricanSwallow', numberOfCoconuts: 3},
      {name: 'aNorwegianBlueParrot', type: 'NorwegianBlueParrot', voltage: 100},
      {name: 'aScorchedNorwegianBlueParrot', type: 'NorwegianBlueParrot', voltage: 101},
      {name: 'anUnknownBird', type: 'invalid'},
    ];
    const result = plumages(birds);
    expect(Array.from(result)).to.deep.equal([
      ['anEuropeanSwallow', 'average'],
      ['anAfricanSwallow', 'average'],
      ['aTiredAfricanSwallow', 'tired'],
      ['aNorwegianBlueParrot', 'beautiful'],
      ['aScorchedNorwegianBlueParrot', 'scorched'],
      ['anUnknownBird', 'unknown'],
    ]);
  });

  it('returns speeds for all kinds of birds', function() {
    const birds = [
      {name: 'anEuropeanSwallow', type: 'EuropeanSwallow'},
      {name: 'anAfricanSwallow', type: 'AfricanSwallow', numberOfCoconuts: 2},
      {name: 'aTiredAfricanSwallow', type: 'AfricanSwallow', numberOfCoconuts: 3},
      {name: 'aNorwegianBlueParrot', type: 'NorwegianBlueParrot', voltage: 100},
      {name: 'aNailedParrot', type: 'NorwegianBlueParrot', isNailed: true, voltage: 100},
      {name: 'anUnknownBird', type: 'invalid'},
    ];
    const result = speeds(birds);
    expect(Array.from(result)).to.deep.equal([
      ['anEuropeanSwallow', 35],
      ['anAfricanSwallow', 36],
      ['aTiredAfricanSwallow', 34],
      ['aNorwegianBlueParrot', 20],
      ['aNailedParrot', 0],
      ['anUnknownBird', null],
    ]);
  });
});
