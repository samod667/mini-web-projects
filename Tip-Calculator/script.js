const totalBillAmount = document.getElementById('bill');
const service = document.getElementsByName('service')
const numOfPeople = document.getElementById('num-of-people');
const submitBtn = document.getElementById('submit')
const results = document.getElementById('result');
const error1 = document.querySelector('.error1')
const error2 = document.querySelector('.error2')
const error3 = document.querySelector('.error3')

//Submit Btn event listener
submitBtn.addEventListener('click', initCalculation)


//Calculate total tip amount
function initCalculation() {
    //Get Input Value
    const totalBill = totalBillAmount.value;
    const billSplit = numOfPeople.value;
    //console.log(typeof totalBill)

    //Get radio btn value
    let serviceTipAmount;
    service.forEach(radio => {
        if (radio.checked) {
            return serviceTipAmount = parseInt(radio.value)
        }
    })

    //Calculate total tip
    const totalTip = calculateTotalTip(totalBill, serviceTipAmount)
    //Calculate tip per person
    const tipPerPerson = calculateTipPerPerson(totalTip, billSplit)
    //console.log(totalTip, tipPerPerson)

    //Check if all inputs are valid
    checkTextInput(totalBill, error1)
    checkTextInput(billSplit, error2)
    checkRadioValue(serviceTipAmount, error3)
    //Display results on UI
    if (error1.className.includes('valid') && error2.className.includes('valid') && error3.className.includes('valid')) {
        displayResults(totalTip, tipPerPerson)
    }
}

//Function calculate total tip
function calculateTotalTip(total, percentage) {
    return total * (percentage / 100)
}

//Function calculate tip per person
function calculateTipPerPerson(totalTip, numOfPeople) {
    return totalTip / numOfPeople
}

//Format money function
function formatMoney(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Display results on UI
function displayResults(value1, value2) {
    const markup = `
        <h4>Total Tip: $${formatMoney(value1)}</h4>
        <h4>Tip per Person: $${formatMoney(value2)}</h4>
    `;
    results.style.display = 'flex'
    results.innerHTML = markup;
}

//Check is text input is valid
function checkTextInput(el, errorMsg) {
    if (el <= 0 || isNaN(el)) {
        errorMsg.classList.remove('valid')
        results.style.display = 'none'
        results.innerHTML = ''
        errorMsg.innerText = 'Please enter a valid choice'
        errorMsg.style.visibility = 'visible'
    } else {
        errorMsg.style.visibility = 'hidden'
        errorMsg.classList.add('valid')
    }
}

//Check if radio btn is clicked
function checkRadioValue(radioValue, errorMsg) {
    if (isNaN(radioValue)) {
        errorMsg.classList.remove('valid')
        results.style.display = 'none'
        results.innerHTML = ''
        errorMsg.style.visibility = 'visible'
        errorMsg.innerText = 'Please choose a tip amount'

    } else {
        errorMsg.style.visibility = 'hidden'
        errorMsg.classList.add('valid')
    }
}







