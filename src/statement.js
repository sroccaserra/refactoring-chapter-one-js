// @ts-check

module.exports = {
  statement,
};

/**
 * @param {Invoice} invoice
 * @param {Object.<string, Play>} plays
 * @returns {string}
 */
function statement (invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);

  return renderPlainText(statementData);

  //////

  /**
   * @param {Performance} aPerformance
   * @returns {PerformanceData}
   */
  function enrichPerformance(aPerformance) {
    const result = {};
    result.playID = aPerformance.playID;
    result.audience = aPerformance.audience;
    result.play = playFor(aPerformance);
    result.amount = amountFor(aPerformance);

    return result;
  }

  /**
   * @param {StatementData} data
   * @returns {number}
   */
  function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }

    return result;
  }

  /**
   * @param {Performance} aPerformance
   * @returns {Play}
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  /**
   * @param {Performance} aPerformance
   * @returns {number}
   */
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

/**
 * @typedef {Object} StatementData
 * @property {string} customer
 * @property {PerformanceData[]} performances
 * @property {number} totalAmount
 */

/**
 * @typedef {Object} PerformanceData
 * @property {string} playID
 * @property {number} audience
 * @property {Play} play
 * @property {number} amount
 */

/**
 * @param {StatementData} data
 * @returns {string}
 */
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  ///////

  /**
   * @returns {number}
   */
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }

    return result;
  }

  /**
   * @param {PerformanceData} aPerformance
   * @returns {number}
   */
  function volumeCreditsFor(aPerformance) {
    let result = Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

}

/**
 * @param {number} aNumber - In cents
 * @returns {string}
 */
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
