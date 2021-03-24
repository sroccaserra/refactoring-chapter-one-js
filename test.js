const { expect } = require('chai');

const plays = require('./plays.json');
const invoice = require('./invoices')[0];
const { statement, htmlStatement } = require('./statement');

describe('statement', function() {
  it('prints statement for first invoice', function() {
      const expected = 'Statement for BigCo\n' +
        '  Hamlet: $650.00 (55 seats)\n' +
        '  As You Like It: $580.00 (35 seats)\n' +
        '  Much Ado About Nothing: $345.00 (15 seats)\n' +
        '  Othello: $400.00 (20 seats)\n' +
        'Amount owed is $1,975.00\n' +
        'You earned 40 credits\n';
      const actual = statement(invoice, plays);

      expect(actual).to.equal(expected)
    });

  it('throws when a play is of unknown type', function() {
    const invoice = {"customer": "BigCo", "performances": [{"playID": "hamlet", "audience": 55 }]};
    const plays = {"hamlet": {"name": "Hamlet", "type": "phony type"}};

    expect(() => statement(invoice, plays))
      .to.throw(/unknown type: phony type/)
  });
});

describe.skip('htmlStatement', function() {
  it('prints statement for first invoice', function() {
      const expected = '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '  <tr><th>play</th><th>seats</th><th>cost</th></tr>\n' +
        '  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        '  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        '  <tr><td>Much Ado About Nothing</td><td>15</td><td>$345.00</td></tr>\n' +
        '  <tr><td>Othello</td><td>20</td><td>$400.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,975.00</em></p>\n' +
        '<p>You earned <em>40</em> credits</p>\n';

      const actual = htmlStatement(invoice, plays);

      expect(actual).to.equal(expected)
    });
});
