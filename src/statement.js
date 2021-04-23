// @ts-check

module.exports = {
  statement,
};

/**
 * @param {Invoice} invoice
 * @param {Object.<string, Play>} plays
 *
 * @returns {string}
 */
function statement (invoice, plays) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  statementData.totalAmount = totalAmount(statementData);

  return renderPlainText(statementData);

  ///

  function enrichPerformance(aPerformance) {
    const result = {
      ...aPerformance,
      play: playFor(aPerformance),
      amount: amountFor(aPerformance),
    }

    return result;
  }

  function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
  }
}

// Single responsibility: render
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  ///////

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }

    return result;
  }

  function volumeCreditsFor(perf) {
    let result = Math.max(perf.audience - 30, 0);

    if ("comedy" === perf.play.type) {
      result += Math.floor(perf.audience / 5);
    }

    return result;
  }

}

function usd(aNumber) {
  const formatter = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2 }).format;

  return formatter(aNumber/100);
}

/**
 * @typedef {Object} Invoice
 * @property {string} customer
 * @property {Performance[]} performances
 */

/**
 * @typedef {Object} Performance
 * @property {string} playID
 * @property {number} audience
 */

/**
 * @typedef {Object} Play
 * @property {string} type
 * @property {string} name
 */
