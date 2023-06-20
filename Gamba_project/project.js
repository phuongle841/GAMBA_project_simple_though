const prompt = require("prompt-sync")();

const ROWS =3;
const COLS =3;
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
};
const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
};

const deposit = () =>{
    while (true) {
        const depositAmount = prompt("enter the deposit amount: ");
        const numberdepositamount = parseFloat(depositAmount);
        if (isNaN(numberdepositamount) || numberdepositamount <= 0) {
            console.log("invalid number amount of money, enter again: ");
        }else{
            return numberdepositamount;
        }
    }
};
const getNumberOfLines = () =>{
    while (true) {
        const lines = prompt("enter the number of lines to bet on(1-3) amount: ");
        const numberOflines = parseFloat(lines);
        if (isNaN(numberOflines) || (numberOflines <= 0 || numberOflines > 3) ) {
            console.log("invalid number amount of lines, enter again: ");
        }else{
            return numberOflines;
        }
    }
};
const getBet = (balance, lines)=>{
    while (true) {
        const bet = prompt("enter the bet per line: ");
        const numberOfBet = parseFloat(bet);
        if (isNaN(numberOfBet) || (numberOfBet <= 0 || numberOfBet >= balance/lines) ) {
            console.log("invalid bet, enter again: ");
        }else{
            return numberOfBet;
        }
    }
};

const spin = () => {
    const symbols =[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        console.log(symbol,count);
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    console.log(symbols);
};

// let balance = deposit();
// const linesAmount = getNumberOfLines();
// const bet = getBet(balance,linesAmount);
spin();