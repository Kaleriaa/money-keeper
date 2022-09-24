'use strict';

const btnStart = document.getElementById('start');
const btnBudgetDate = document.querySelector('.start-item-btn');
const bdItem = document.querySelectorAll('.bd-item');
const results = document.querySelectorAll('div[class$="-value"]');
const expensesValue = document.querySelector('.expenses-value');
const expenses = document.querySelectorAll('.expenses-item');
const btnSubmmitExpense = document.querySelector('.expenses-item-btn');
const btnSubmitOptional = document.querySelector('.optionalexpenses-btn');
const btnCalc = document.querySelector('.count-budget-btn');
const optExpenses = document.querySelectorAll('.optionalexpenses-item');
const year = document.querySelector('.year-value');
const month = document.querySelector('.month-value');
const day = document.querySelector('.day-value');
const income = document.querySelector('.choose-income');
const incomeValue = document.querySelector('.income-value');
const sum = document.querySelector('.choose-sum');
const percent = document.querySelector('.choose-percent');
const savings = document.querySelector('#savings');
const budgetValue = document.querySelector('.budget-value');
const optExpensesValue = document.querySelector('.optionalexpenses-value');
const budgetDayValue = document.querySelector('.daybudget-value');
const levelValue = document.querySelector('.level-value');
const monthSaving = document.querySelector('.monthsavings-value');
const yearSaving = document.querySelector('.yearsavings-value');

btnStart.disabled = true;

let time, money;
let appData = {
    budget: money,
    data: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false
};

let btns = {
    btn1: false,
    btn2: false, 
    btn3: false
}

function fieldValidation(list) {
    list.forEach(element => {
        if (!!element.value) {
            element.classList.add('input_filed');
            element.classList.remove('input_not-filed');
            return;
        }
        element.classList.remove('input_filed');
        element.classList.add('input_not-filed');
    });
}

btnBudgetDate.addEventListener('click', () => {
    fieldValidation(bdItem);
    appData.budget = +bdItem[0].value;
    appData.data = bdItem[1].value;
    if (!!appData.budget && !!appData.data) {
        btns.btn1 = true;
    }
    btnValidation();
})

let sumExpenses = 0;
btnSubmmitExpense.addEventListener('click', () => {
    fieldValidation(expenses);
    for (let i = 0; i < expenses.length; i++) {
        let question = expenses[i].value;
        let answer = +expenses[++i].value;
        if (typeof question === 'string' && !!question &&
            !!answer) {
            appData.expenses[question] = answer;
            sumExpenses += answer;
            btns.btn2 = true;
        } else {
            btns.btn2 = false;
        }
    }
    btnValidation();
})

btnSubmitOptional.addEventListener('click', () => {
    fieldValidation(optExpenses);
    for (let i = 0; i < optExpenses.length; i++) {
        let opt = optExpenses[i].value;
        appData.optionalExpenses[i] = opt;
        optExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        btns.btn3 = true;
    }
    btnValidation();
})

btnCalc.addEventListener('click', () => {
    if (!!appData.budget) {
        let budgetDay = Math.ceil((appData.budget - sumExpenses) / 30);
        appData.budgetForDay = budgetDay;
        budgetDayValue.textContent = budgetDay;

        if (budgetDay < 100) {
            levelValue.textContent = "Низкий уровень достатка";
        } else if (budgetDay > 100 && budgetDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (budgetDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Что-то пошло не так";
        }
    }
    else {
        budgetDayValue.textContent = "Произошла ошибка";
    }
})

appData.monthIncome = "Накоплений нет";
appData.yearIncome = "Накоплений нет";
sum.readOnly = true;
percent.readOnly = true;
savings.addEventListener('change', () => {
    appData.saving = savings.checked;
    if (savings.checked) {
        sum.readOnly = false;
        percent.readOnly = false;
    } else {
        sum.readOnly = true;
        percent.readOnly = true;
        sum.value = '';
        sum
        percent.value = '';
    }
})

function btnValidation () {
    if (btns.btn1 && btns.btn2 && btns.btn3){
        btnStart.disabled = false;
    }
    console.log(btns.btn1 && btns.btn2 && btns.btn3);
}

btnStart.addEventListener('click', () => {
    let save = +sum.value;
    let perc = +percent.value;
    const date = new Date(Date.parse(appData.data));
    appData.monthIncome = save / 100 / 12 * perc;
    appData.yearIncome = save / 100 * perc;

    budgetValue.textContent = appData.budget;
    month.value = date.getMonth() + 1;
    year.value = date.getFullYear();
    day.value = date.getDate();
    monthSaving.textContent = appData.monthIncome.toFixed(1);
    yearSaving.textContent = appData.yearIncome;
    incomeValue.textContent = income.value.split(', ');
    appData.income = income.value.split(', ');
    expensesValue.textContent = sumExpenses;
})
