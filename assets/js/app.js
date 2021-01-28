'use strict'
// new notification snackbar
// this pops a new snackbar notification at the top
class Snackbar {
    constructor() {
        this.snackbar = document.createElement('div')
    }
    init() {
        this.snackbar.classList.add('snackbar')
        document.querySelector('body').appendChild(this.snackbar)
    }
    show(message) {
        this.snackbar.textContent = message
        this.snackbar.classList.add('active')
        setTimeout(() => {
            this.snackbar.classList.remove('active')
        },4000)
    }
}

// Login Btn Click Function
document.querySelector('.login-btn').addEventListener('click', function () {
    document.querySelector('.login-section').style.display = 'none';
    document.querySelector('.transaction-section').style.display = 'block';
});


// get the current balance function
const getCurrentBalance = () => Number(document.querySelector('#currentBalance').textContent)
let currentBalance = getCurrentBalance()


// Deposit Value
document.querySelector('.deposit-input').addEventListener('click',() => {
    const depositValue = getInputValue('.deposit-amount');
    if (!depositValue || depositValue < 0) {
        // I made the rule for not accepting negative value
        const error = new Snackbar()
        error.init()
        error.show('Please enter a valid ammount of number to deposit')
        //!There is nothing in the DOM by this name, so no need for these two lines
        // document.querySelector('.warning-message').textContent = 'Wrong Amount! ðŸ˜¢ðŸ˜¢';
        // document.querySelector('.warning-message').classList = 'text-danger';
        document.querySelector('.deposit-amount').value = '0';
    } else {
        getUpdateValue('.current-deposit', depositValue);
        getUpdateValue('.current-balance', depositValue);
        document.querySelector('.deposit-amount').value = '';
        // getting the new balance here after the deposit
        currentBalance = getCurrentBalance()

    }
});

// Withdraw Value

document.querySelector('.withdraw-input').addEventListener('click', function () {
    const withdrawValue = getInputValue('.withdraw-amount');
    if (withdrawValue < 0 || !withdrawValue) {
        const error = new Snackbar()
        error.init()
        error.show('Please enter a valid number of ammount to withdraw')
        document.querySelector('.withdraw-amount').value = 0

        //The bottom if statement is for not letting someone withdraw more than your current balance
    } else if(withdrawValue > currentBalance) {
        const error = new Snackbar()
        error.init()
        error.show(`You cannot withdraw more than you have in you balance. Your current withdraw amount ${withdrawValue} is bigger than your current Balance ${currentBalance}`)
    }
    else {
        getUpdateValue('.current-withdraw', withdrawValue);
        getUpdateValue('.current-balance', -1 * withdrawValue);
        document.querySelector('.withdraw-amount').value = '';

        // getting new balance after a withdraw
        currentBalance = getCurrentBalance()
    }
});


// Function for Getting Input Number

function getInputValue(inputValue) {
    const value = Number(document.querySelector(inputValue).value);
    return value;
}

// Function for Calculation
function getUpdateValue(updateValue, newValue) {
    let currentValue = Number(document.querySelector(updateValue).textContent);
    let totalValue = currentValue + newValue;
    document.querySelector(updateValue).textContent = totalValue;
}

