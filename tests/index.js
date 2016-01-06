var test = require('tape');
var MoneroPrices = require('./../lib/index');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

test('getting the rate of XMR/BTC without duplicates', function (t) {
  MoneroPrices.get('BTC').then(function (rate) {
    t.ok(isNumeric(rate.fiatBased));
    t.end();
  });
});

test('getting the rate of XMR/BTC with duplicates', function (t) {
  MoneroPrices.get(['BTC', 'BTC', 'btc', 'Btc']).then(function (rate) {
    t.ok(isNumeric(rate.fiatBased));
    t.end();
  });
});

test('getting the rate of every known currency', function (t) {
  MoneroPrices.get().then(function (rates) {
    rates.forEach(function (rate) {
      t.ok(isNumeric(rate.xmrBased));
    });
    t.end();
  });
});
