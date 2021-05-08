// @ts-check

const {expect} = require('chai');

const {rating} = require('../src/ratings');

describe('ratings', function() {
  it('computes the example rating', function() {
    const voyage = {zone: "west-indies", length: 10};
    const history = [
      {zone: "east-indies", profit:  5},
      {zone: "west-indies", profit: 15},
      {zone: "china",       profit: -2},
      {zone: "west-africa", profit:  7},
    ];

    const myRating = rating(voyage, history);
    expect(myRating).to.equal('B');
  })

  it('compute a B rating', function() {
    const voyage = {zone: 'europe', length: 0};
    const history = [];
    expect(rating(voyage, history)).to.equal('B');
  });

  it('compute an A rating', function() {
    const voyage = {zone: 'china', length: 0};
    const history = [
      {zone: 'china', profit: 0}
    ];
    expect(rating(voyage, history)).to.equal('A');
  });

  it('compute rating for a long voyage', function() {
    const voyage = {zone: 'china', length: 10};
    const history = [
      {zone: 'china', profit: 0}
    ];
    expect(rating(voyage, history)).to.equal('A');
  });

  it('compute rating for a very long voyage with a short history', function() {
    const voyage = {zone: 'china', length: 18};
    const history = [
      {zone: 'china', profit: 0}
    ];
    expect(rating(voyage, history)).to.equal('B');
  });

  it('compute rating for a long voyage with a long history', function() {
    const voyage = {zone: 'east-indies', length: 18};
    const history = [
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
    ];
    expect(rating(voyage, history)).to.equal('B');
  });

  it('compute rating for a long voyage with a normal history', function() {
    const voyage = {zone: 'china', length: 18};
    const history = [
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
    ];
    expect(rating(voyage, history)).to.equal('A');
  });

  it('compute rating for a very long voyage with a long history', function() {
    const voyage = {zone: 'china', length: 19};
    const history = [
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
    ];
    expect(rating(voyage, history)).to.equal('B');
  });

  it('compute rating for a very long voyage with a very long history', function() {
    const voyage = {zone: 'china', length: 19};
    const history = [
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
      {zone: 'china', profit: 0},
    ];
    expect(rating(voyage, history)).to.equal('A');
  });

  it('compute rating for a voyage with a long history not including china', function() {
    const voyage = {zone: 'china', length: 15};
    const history = [
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
      {zone: 'east-indies', profit: 0},
    ];
    expect(rating(voyage, history)).to.equal('B');
  });
});
