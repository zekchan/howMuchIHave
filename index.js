const fetch = require('node-fetch');

const I_HAVE = require('./balance.json');

Promise.all(
    Object.keys(I_HAVE).map(ticker => fetch(`https://api.coinmarketcap.com/v1/ticker/${ticker}/?convert=btc`)
        .then(res => res.json())
        .then(([{ price_usd, price_btc }]) => {
            return ({
                btc: price_btc * I_HAVE[ticker],
                usd: price_usd * I_HAVE[ticker]
            })
        })
    )
)
    .then(values => console.log(values.reduce(({ totalUsd, totalBtc }, { btc, usd }) => ({
            totalUsd: totalUsd + usd,
            totalBtc: totalBtc + btc
        }), { totalBtc: 0, totalUsd: 0 })
    ));
