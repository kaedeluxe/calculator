const query = (query) => document.querySelector(query),
  queryAll = (query) => document.querySelectorAll(query),
  createEl = (element) => document.createElement(element),
  screenText = query('.screenText'),
  buttonsAll = queryAll('.buttonBackground'),
  inputDigits = queryAll('.digit'),
  buttonClear = query('[data-input="C"]'),
  buttonDecimal = query('.decimal');

let firstNumber, operation, secondNumber, screenValFirst, screenValCurrent;

inputDigits.forEach((button) => {
  button.addEventListener('click', () => {
    if (screenText.textContent == '0') {
      screenText.textContent = button.getAttribute('data-input');
    } else {
      screenText.textContent += button.getAttribute('data-input');
    }
    screenValCurrent = screenText.textContent;
  });
});

buttonClear.addEventListener('click', () => {
  screenText.textContent = '0';
});

buttonDecimal.addEventListener('click', () => {
  if (screenText.textContent.includes('.')) {
    return;
  } else {
    screenText.textContent += '.';
  }
});
