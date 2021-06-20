'use strict';

const balance = document.querySelector('.balance');
const incomeMoney = document.querySelector('.money-income');
const expenseMoney = document.querySelector('.money-expense');

const list = document.querySelector('.list');
const error = document.querySelector('.expense-error');

const form = document.querySelector('.form');
const formText = document.getElementById('text');
const formAmount = document.getElementById('amount');

let expenses = [];
const generateRandomId = () => {
  return Math.floor(Math.random() * 500);
};

const generateDom = transaction => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const listItem = document.createElement('li');
  listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  listItem.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn btn" onclick="deleteExpense(${
    transaction.id
  })">x</button>
  `;
  list.appendChild(listItem);
};

const updateValues = () => {
  const amounts = expenses.map(expense => expense.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${total}`;
  incomeMoney.innerText = `${income}`;
  expenseMoney.innerText = `${expense}`;
};

const deleteExpense = () => {
  list.innerHTML = '';
  updateValues();
};

const updateError = message => {
  error.textContent = message;
};

const addAction = e => {
  e.preventDefault();
  if (formText.value.trim() === '' && formAmount.value.trim() === '') {
    updateError('Please enter name and amount');
  }
  if (formText.value.trim() === '') {
    updateError('Please enter name');
  }
  if (formAmount.value.trim() === '') {
    updateError('Please enter amount');
  } else {
    const newAction = {
      id: generateRandomId(),
      text: formText.value,
      amount: +formAmount.value,
    };
    expenses.push(newAction);
    generateDom(newAction);
    updateValues();
    formText.value = '';
    amount.value = '';
  }
};

form.addEventListener('submit', addAction);
