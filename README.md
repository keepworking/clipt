# HOW TO USE

## set private key
```
node cli.js set_private_key PRIVATE_KEY
```

## set wallet address
```
node cli.js set_wallet WALLET
```

## buy token

```
node cli.js buy wbnb cherry 0.001
# if tokens are registred you can buy token with name
```
or
```
node cli.js buy 0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c cherry 0.001
# if tokens are did not registred you can buy token with hex address
```

this command will swap 0.0001(wbnb) to ????(cherry)

## register token
```
node cli.js register_token busd 0xe9e7cea3dedca5984780bafc599bd69add087d56
```

## buy token multitime
```
node cli.js set_buy_count_delay 500
node cli.js set_buy_count 5
node cli.js buy busd wbnb 0.001
busd: 0xe9e7cea3dedca5984780bafc599bd69add087d56
wbnb: 0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c
> start buy
> start buy
> start buy
> start buy
> { amountIn: 0.001, amountOut: 0.000003327249393511 }
> { amountIn: 0.001, amountOut: 0.00000332724939348 }
> { amountIn: 0.001, amountOut: 0.000003327258607896 }
> { amountIn: 0.001, amountOut: 0.0000033272586079270002 }
> { amountIn: 0.001, amountOut: 0.0000033272887089190003 }
```