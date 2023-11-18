// balance (id)
// money_plus (id)
// money_minus (id)
// list (class,id)
// minus (class)
// delete-btn(class)
// form (id)
// form-control(class)
// text (id , for - add text in transaction )
// amount (id)

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactionHistory = JSON.parse(localStorage.getItem('transaction'));
let transaction = localStorage.getItem('transaction') !== null ? localStorageTransactionHistory : [];

// add new transaction 
function addNewTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter amount and text to add transaction ');
    } else {
        const transactionx = {
            id: getRandomID(),
            text: text.value,
            amount: +amount.value
        };

        transaction.push(transactionx);
        addTransactionDOM(transactionx);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';

    }
}

// get random id using - Math.floor()
function getRandomID() {
    return Math.floor(Math.random() * 10000000000);
}

//  Using the DOM element, inserting transaction values into the page. 
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransactionHistory(${transaction.id})">x</button>
    `
    list.appendChild(item);
}


// update values
function updateValues() {
    //Balance Logic
    const amounts = transaction.map((transaction) => {
        return transaction.amount;
    })

    const total = amounts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0)


    //Income logic
    const getPlusValues = amounts.filter((item) => {
        return item > 0
    })

    const income = getPlusValues.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0)


    // Expense Logic
    const getMinusValues = amounts.filter((item) => {
        return item < 0
    })
    
    const expense = getMinusValues.reduce((accumulator, currentValue) => {
        return +(accumulator - currentValue);
    }, 0)

    balance.innerText = ` INR(₹) : ${total} `
    money_plus.innerText = ` ₹${income} `
    money_minus.innerText = ` ₹${expense} `
}



//removeTransactionHistory - remove transaction history
function removeTransactionHistory(id) {
    transaction = transaction.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// update local storage 
function updateLocalStorage() {
    localStorage.setItem('transaction', JSON.stringify(transaction));
}


// init()
function init() {
    list.innerHTML = '';
    transaction.forEach(addTransactionDOM);
    updateValues()
}

init();
form.addEventListener('submit', addNewTransaction);

//* @mondalcodehub | NOV-2022 | *//