const fs = require('fs')
const trade = require("./trade.js")
const args = process.argv.slice(2)

var tokenIn = ""
var tokenOut = ""

var buyCount = 0;

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

switch(args[0]){
    case 'set_buy_count_delay':
        fs.writeFileSync("buy_count_delay", args[1])
        process.exit()
    case 'set_buy_count':
        fs.writeFileSync("buy_count", args[1])
        process.exit()
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
        if(args[1].startsWith("0x")){
            tokenOut = args[1]
        }
        else{
            tokenOut = fs.readFileSync(args[1]).toString();
            console.log(`${args[1]}: ${tokenOut}`);
        }
        if(args[2].startsWith("0x")){
            tokenIn = args[2]
        }
        else{
            tokenIn = fs.readFileSync(args[2]).toString();
            console.log(`${args[2]}: ${tokenIn}`);
        }
        break;
}

var wallet = fs.readFileSync("wallet").toString();
var timeout = parseFloat(fs.readFileSync("timeout").toString());
var private_key = fs.readFileSync('private_key').toString();
var buy_count = parseInt(fs.readFileSync('buy_count').toString());
var buy_count_delay = parseInt(fs.readFileSync('buy_count_delay').toString());


trade.setWallet(private_key)
trade.setTimeout(timeout);

buy = async () => {
    buyCount++;
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
    buyCount--;
    if(buyCount == 0){
        process.exit();
    }
}

main = async () => {
    for (let index = 0; index < buy_count; index++) {
        buy()
        await sleep(buy_count_delay)
    }
}

main()
