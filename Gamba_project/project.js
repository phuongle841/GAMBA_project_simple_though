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
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random()*symbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.slice(randomIndex,1);
        }        
    }
    return reels;
};
const transpose= (reels)=>{
    const rows =[];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);            
        }
    }
    return rows;
}

const printRows =(rows)=>{
    for (const row of rows) {
        let rowString ="";
        for (const [i,symbol] of row.entries()) {
            rowString +=symbol;
            if (i!=row.length-1) {
                rowString+=" | ";
            }
        }
        console.log(rowString);
    }
}
const getWinning=(rows, bet, lines)=>{
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame =true;
        for (const symbol of symbols) {
            if (symbol!=symbols[0]) {
                allSame = false;
                break;
            }
        }        
        if (allSame) {
            winnings += bet* SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}
const game =()=>{
    let balance = deposit();
    while (true) {
        console.log("you have a balance of "+ balance.toString());
        const linesAmount = getNumberOfLines();
        const bet = getBet(balance,linesAmount);
        balance -=bet*linesAmount;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinning(rows,bet,linesAmount);
        balance+=winnings;
        console.log("you won, $"+winnings.toString());
        if (balance<=0) {
            console.log("you run out of money");
            break;
        }
        const playAgain = prompt("do you want to play again ? (y/n) ");
        if (playAgain!="y") {
            break;
        }
    }
    
}
game();
