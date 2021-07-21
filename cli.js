const fs = require('fs')
const trade = require("./trade.js")
const args = process.argv.slice(2)

console.log(args)

switch(args[0]){
    case 'set_timeout':
        fs.writeFileSync("timeout", args[1])
        process.exit()
    case 'set_private_key':
        fs.writeFileSync("private_key", args[1])
        console.log(fs.readFileSync('private_key').toString())
        process.exit()
    case 'set_wallet':
        fs.writeFileSync("wallet", args[1])
        process.exit()
    case 'buy':
        var private_key = fs.readFileSync('private_key').toString();
        trade.setWallet(private_key)
        break;
}


var wallet = fs.readFileSync("wallet").toString();
var timeout = parseFloat(fs.readFileSync("timeout").toString());

trade.setTimeout(timeout);

buy = async () => {
    console.log("start buy")

    result = await trade.buy(
        args[1], // tokenOut
        args[2], // tokenIn
        parseFloat(args[3]), // amount
        wallet, // wallet
        15, // slippage
        5, // gasPrice
        450000, // gasPrice
        0.1 // minBnb
    )

    console.log(result)
    process.exit();
}

buy();
