var rp = require('request-promise');

/**
 * @module monero-prices
 */

var BASE_URL = 'http://moneropric.es';

/**
 * Represents the exchange rate of a currency pair involving Monero.
 * @typedef {Object} ExchangeRate
 * @property {number} fiatBased Fiat-based exchange rate of the currency pair.
 * @property {number} xmrBased Monero-based exchange rate of the currency pair.
 * @property {string} code Code of the currency of which the value is compared
 * to Monero's value.
 * @property {string} name Name of the currency of which the value is compared
 * to Monero's value.
 */

/**
 * Gets the current price of Monero compared to a specific currency or a list
 * of currencies.
 * @param {(string|string[])?} currencyCode Code of the currency/currencies to
 * compare Monero's price with. If null, then every known currency will be
 * compared.
 * @returns {Promise.<ExchangeRate|ExchangeRate[]>} Current exchange rate(s) of
 * the currency pair(s) specified.
 */
exports.get = function (currencyCode) {
  var output;

  // Convert 'currencyCode' to an array if necessary
  if (typeof currencyCode === 'string') {
    currencyCode = [currencyCode];
  } else {
    output = [];
  }

  // Make each element of the 'currencyCode' array uppercase if necessary
  if (currencyCode != null) {
    currencyCode = currencyCode.map(function (x) { return x.toUpperCase(); });
  }

  return request('/fiat.json', function (body, resolve) {
    // Iterate through every rate, checking for the currency code
    body.forEach(function (element) {
      var code = element.code;

      // Obtain every appropriate rate
      if (currencyCode == null || currencyCode.indexOf(code) >= 0) {
        var rate = {
          fiatBased: element['fiat-rate'],
          xmrBased: element['xmr-rate'],
          code: code,
          name: element['name']
        };

        if (output != null) {
          // Add the rate to the array of rates if possible
          output.push(rate);
        } else {
          // Return a single rate if only a single currency was queried
          resolve(rate);
          return;
        }
      }
    });

    if (output == null || output.length === 0) {
      // Currency code couldn't be found
      throw new Error('No matching currency code could be found.');
    }

    // Return the array of rates if possible, or a single rate if necessary
    resolve(output.length > 1 ? output : output[0]);
  });
};

function request(relativeUrl, callback) {
  return new Promise(function (resolve, reject) {
    rp({ json: true, uri: BASE_URL + relativeUrl })
      .then(function (body) {
        // Pass the 'body' and 'resolve' objects to the callback on success
        callback(body, resolve);
      })
      .catch(function (err) {
        // Reject the Promise with an error on fail
        reject(err);
      });
  });
}
