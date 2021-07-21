const ethers = require("ethers");
const wss = "wss://bsc-ws-node.nariox.org:443";
const provider = new ethers.providers.WebSocketProvider(wss);

const pancake = {
    factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",  //PancakeSwap V2 factory
    router: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //PancakeSwap V2 router
}
const regex = /^0x?([a-f\d]{64})([a-f\d]{64})([a-f\d]{64})([a-f\d]{64})$/i;

var wallet = null;
var account = null;
var factory = null;
var router = null;

var timeout = 5;

exports.setTimeout = (t) => {
    timeout = t;
}

exports.setWallet = (mnemonic) => {
    wallet = new ethers.Wallet(mnemonic);
    account = wallet.connect(provider);

    factory = new ethers.Contract(
        pancake.factory,
        [
            'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
            'function getPair(address tokenA, address tokenB) external view returns (address pair)'
        ],
        account
    );

    router = new ethers.Contract(
        pancake.router,
        [
            'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
            'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
            'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
        ],
        account
    );
}

exports.buy = async (tokenIn, tokenOut, amount, recipient, slippage, gasPrice, gasLimit, minBnb) => {
    const erc = new ethers.Contract(
        tokenIn,
        [{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"type": "function"}],
        account
    );

    const pairAddressx = await factory.getPair(tokenIn, tokenOut);
    const pairBNBvalue = await erc.balanceOf(pairAddressx);
    const jmlBnb = await ethers.utils.formatEther(pairBNBvalue);
    const amountIn = ethers.utils.parseUnits(`${amount}`, 'ether');

    if(jmlBnb <= minBnb) {
        throw Erorr("Retry")
    }
    const amounts =  await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
    const amountOutMin = amounts[1].sub(amounts[1].div(`${slippage}`));
    const tx = await router.swapExactTokensForTokens( //uncomment here if you want to buy token
        amountIn,
        amountOutMin,
        [tokenIn, tokenOut],
        recipient,
        Date.now() + 1000 * 60 * timeout, //default 5 minutes
        {
            'gasLimit': gasLimit,
            'gasPrice': ethers.utils.parseUnits(`${gasPrice}`, 'gwei'),
            'nonce' : null //set you want buy at where position in blocks
        }
    );

    const receipt = await tx.wait();
        
    rawLog = receipt.logs[receipt.logs.length - 1].data;
    hex = regex.exec(rawLog);
    const result = {
        "amountIn" : (parseInt("0x" + hex[1]) * 1e-18) + (parseInt("0x" + hex[2]) * 1e-18),
        "amountOut": (parseInt("0x" + hex[3]) * 1e-18) + (parseInt("0x" + hex[4]) * 1e-18),
    }
    return result;
}