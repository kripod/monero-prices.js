/* eslint no-console: 0 */

var readline = require('readline');
var MoneroPrices = require('./../lib/index');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showRateQuery() {
  rl.question('currencyCode (BTC): ', function (currencyCode) {
    currencyCode = currencyCode || 'BTC';

    MoneroPrices.get(currencyCode)
      .then(
        function (rate) {
          // Handle successful query
          console.log(
            '1 XMR equals ' +
            rate.fiatBased + ' ' + currencyCode.toUpperCase() + '\n'
          );
        },

        function (err) {
          // Handle error
          console.log(err.message + '\n');
        }
      )

      .then(function () {
        // Ask the question again
        showRateQuery();
      });
  });
}

showRateQuery();
