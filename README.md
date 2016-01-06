# monero-prices

[![Version (npm)](https://img.shields.io/npm/v/monero-prices.svg)](https://npmjs.com/package/monero-prices)
[![Build Status](https://img.shields.io/travis/kripod/monero-prices.js/master.svg)](https://travis-ci.org/kripod/monero-prices.js)
[![Code Coverage](https://img.shields.io/codeclimate/coverage/github/kripod/monero-prices.js.svg)](https://codeclimate.com/github/kripod/monero-prices.js/coverage)
[![Code Climate](https://img.shields.io/codeclimate/github/kripod/monero-prices.js.svg)](https://codeclimate.com/github/kripod/monero-prices.js)

Wrapper for the API methods of moneropric.es, written in JavaScript.

## API Reference

* [monero-prices](#module_monero-prices)
    * _static_
        * [.get(currencyCode)](#module_monero-prices.get) ⇒ <code>Promise.&lt;(ExchangeRate\|Array.&lt;ExchangeRate&gt;)&gt;</code>
    * _inner_
        * [~ExchangeRate](#module_monero-prices..ExchangeRate) : <code>Object</code>

<a name="module_monero-prices.get"></a>
### monero-prices.get(currencyCode) ⇒ <code>Promise.&lt;(ExchangeRate\|Array.&lt;ExchangeRate&gt;)&gt;</code>
Gets the current price of Monero compared to a specific currency or a listof currencies.

**Kind**: static method of <code>[monero-prices](#module_monero-prices)</code>  
**Returns**: <code>Promise.&lt;(ExchangeRate\|Array.&lt;ExchangeRate&gt;)&gt;</code> - Current exchange rate(s) ofthe currency pair(s) specified.  

| Param | Type | Description |
| --- | --- | --- |
| currencyCode | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | Code of the currency/currencies to compare Monero's price with. If null, then every known currency will be compared. |

<a name="module_monero-prices..ExchangeRate"></a>
### monero-prices~ExchangeRate : <code>Object</code>
Represents the exchange rate of a currency pair involving Monero.

**Kind**: inner typedef of <code>[monero-prices](#module_monero-prices)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fiatBased | <code>number</code> | Fiat-based exchange rate of the currency pair. |
| xmrBased | <code>number</code> | Monero-based exchange rate of the currency pair. |
| code | <code>string</code> | Code of the currency of which the value is compared to Monero's value. |
| name | <code>string</code> | Name of the currency of which the value is compared to Monero's value. |

