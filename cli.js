const fs = require('fs')
const trade = require("./trade.js")
const args = process.argv.slice(2)

console.log(args)

switch(args[0]){
    case 'set_wallet':
        fs.writeFileSync("wallet", args[1])
        console.log(fs.readFileSync('wallet').toString())
        process.exit()
        break;
    case 'set_recipient':
        fs.writeFileSync("recipient", args[1])
        process.exit()
        break;
    case 'buy':
        var wallet = fs.readFileSync('wallet').toString();
        trade.setWallet(wallet)
        break;
}


var recipient = fs.readFileSync("recipient").toString();

buy = async () => {
    console.log("start buy")
    console.log(recipient)
    result = await trade.buy(
        args[1], // tokenOut
        args[2], // tokenIn
        parseFloat(args[3]), // amount
        recipient, // recipient
        15, // slippage
        5, // gasPrice
        450000, // gasPrice
        0.1 // minBnb
    )


    console.log(result)
    process.exit();
}

buy();
