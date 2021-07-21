const fs = require('fs')
const trade = require("./trade.js")
const args = process.argv.slice(2)

var tokenIn = ""
var tokenOut = ""

// console.log(args)

switch(args[0]){
    case 'register_token':
        fs.writeFileSync(args[1], args[2])
        process.exit()
    case 'set_timeout':
        fs.writeFileSync("timeout", args[1])
        process.exit()
    case 'set_private_key':
        fs.writeFileSync("private_key", args[1])
        process.exit()
    case 'set_wallet':
        fs.writeFileSync("wallet", args[1])
        process.exit()
    case 'buy':
        tokenOut = fs.readFileSync(args[1]).toString();
        tokenIn = fs.readFileSync(args[2]).toString();
        console.log(`${args[1]}: ${tokenOut}`);
        console.log(`${args[2]}: ${tokenIn}`);
        break;
    // case 'buy_with_hex':
    //     tokenIn = args[2];
    //     tokenOut = args[1];
    //     break;
}

var wallet = fs.readFileSync("wallet").toString();
var timeout = parseFloat(fs.readFileSync("timeout").toString());
var private_key = fs.readFileSync('private_key').toString();

trade.setWallet(private_key)
trade.setTimeout(timeout);

buy = async () => {
    console.log("start buy")

    result = await trade.buy(
        tokenOut, // tokenOut
        tokenIn, // tokenIn
        parseFloat(args[3]), // amount
        wallet, // wallet
        1, // slippage
        5, // gasPrice
        450000, // gasPrice
        0.001 // minBnb
    )

    console.log(result)
    process.exit();
}

buy();
