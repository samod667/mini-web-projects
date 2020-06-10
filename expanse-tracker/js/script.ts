const text = document.getElementById('text');
const amount = document.getElementById('amount');
const submitBtn = document.getElementsByClassName('btn');
const list = document.getElementById('list');
const form = document.getElementById('form');
const deleteBtn = document.getElementsByClassName('delete-btn');
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById("money-minus");

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transactions to DOM list

function addTransactionDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    
    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(
      transaction.amount
    )}</span><button onclick="removeTransaction(${transaction.id})" class="delete-btn">x</button>
    `;

    list.appendChild(item);
};

//Update balance income and expense

function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    const expanse = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // console.log(total, income, expanse);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `-$${expanse}`;
    
    
}

// Adding transaction from form
function addTransaction(e) {
    e.preventDefault();
    let textValue = (<HTMLInputElement>text).value;
    let amountValue = (<HTMLInputElement>amount).value;

    if (textValue.trim() == "" || amountValue.trim() == "") {
      alert('Please add text and amount ');

    } else {
      text.classList.remove("error");
      amount.classList.remove("error");
      const transaction = {
        id: generateID(),
        text: textValue,
        amount: +amountValue,
      };
      transactions.push(transaction);

      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();

      (<HTMLInputElement>text).value = "";
      (<HTMLInputElement>amount).value = "";
    }
}

//Generate random ID

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

//Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage();

    init();
}

//Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// init app

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues()
}

init();

form.addEventListener('submit', addTransaction);