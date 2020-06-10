var text = document.getElementById('text');
var amount = document.getElementById('amount');
var submitBtn = document.getElementsByClassName('btn');
var list = document.getElementById('list');
var form = document.getElementById('form');
var deleteBtn = document.getElementsByClassName('delete-btn');
var balance = document.getElementById('balance');
var money_plus = document.getElementById('money-plus');
var money_minus = document.getElementById("money-minus");
var localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
var transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
// Add transactions to DOM list
function addTransactionDOM(transaction) {
    //Get sign
    var sign = transaction.amount < 0 ? '-' : '+';
    var item = document.createElement('li');
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = "\n        " + transaction.text + " <span>" + sign + "$" + Math.abs(transaction.amount) + "</span><button onclick=\"removeTransaction(" + transaction.id + ")\" class=\"delete-btn\">x</button>\n    ";
    list.appendChild(item);
}
;
//Update balance income and expense
function updateValues() {
    var amounts = transactions.map(function (transaction) { return transaction.amount; });
    var total = amounts.reduce(function (acc, item) { return (acc += item); }, 0).toFixed(2);
    var income = amounts.filter(function (item) { return item > 0; }).reduce(function (acc, item) { return (acc += item); }, 0).toFixed(2);
    var expanse = (amounts.filter(function (item) { return item < 0; }).reduce(function (acc, item) { return (acc += item); }, 0) * -1).toFixed(2);
    // console.log(total, income, expanse);
    balance.innerText = "$" + total;
    money_plus.innerText = "$" + income;
    money_minus.innerText = "-$" + expanse;
}
// Adding transaction from form
function addTransaction(e) {
    e.preventDefault();
    var textValue = text.value;
    var amountValue = amount.value;
    if (textValue.trim() == "" || amountValue.trim() == "") {
        alert('Please add text and amount ');
    }
    else {
        text.classList.remove("error");
        amount.classList.remove("error");
        var transaction = {
            id: generateID(),
            text: textValue,
            amount: +amountValue
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}
//Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}
//Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(function (transaction) { return transaction.id !== id; });
    updateLocalStorage();
    init();
}
//Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
// init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();
form.addEventListener('submit', addTransaction);
