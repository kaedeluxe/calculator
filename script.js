const query = (query) => document.querySelector(query),
        queryAll = (query) => document.querySelectorAll(query),
        screenCurrent = query('.screenText'),
        screenPrev = query('.screenPrev'),
        buttonsAll = queryAll('.buttonBackground'),
        inputDigits = queryAll('.digit'),
        buttonClearAll = queryAll('.clear'),
        buttonDecimal = query('.decimal'),
        inputEquals = query('.equals'),
        inputoperateTypes = queryAll('.operation');

let firstNumber,
        operateType,
        opCount = 0,
        secondNumber,
        screenValPrev,
        screenValCurrent = '',
        result;

function clearScreen(clearType) {
        switch (clearType) {
                case 'C':
                        screenCurrent.textContent = '0';
                        screenValCurrent = '';
                        firstNumber = '';
                        break;
                case 'CE':
                        screenCurrent.textContent = '0';
                        screenPrev.textContent = '0';
                        screenValCurrent = '';
                        screenValPrev = '';
                        firstNumber = '';
                        secondNumber = '';
                        result = '';
                        opCount = 0;
                        break;
                case 'Back':
                        screenCurrent.textContent = 'idfk';
                        break;
        }
}

inputDigits.forEach((button) => {
        let buttonData = button.getAttribute('data-input');
        button.addEventListener('click', () => {
                if (screenCurrent.textContent == '0') {
                        screenCurrent.textContent = buttonData;
                } else {
                        screenCurrent.textContent += buttonData;
                }
                screenValCurrent += buttonData;
        });
});

inputoperateTypes.forEach((button) => {
        button.addEventListener('click', () => {
                if (opCount > 0) {
                        operate();
                }
                operateType = button.getAttribute('data-input');
                opCount++;
                screenValPrev = screenValCurrent;
                screenPrev.textContent = screenValPrev;
                clearScreen('C');
                screenValCurrent = '';
                screenCurrent.textContent = `${operateType} `;
                firstNumber = Number(screenValPrev);
        });
});

buttonClearAll.forEach((button) => {
        button.addEventListener('click', () => {
                clearScreen(button.getAttribute('data-input'));
        });
});

buttonDecimal.addEventListener('click', () => {
        if (screenValCurrent.includes('.')) {
                return;
        } else {
                screenCurrent.textContent += '.';
                screenValCurrent += '.';
        }
});

function roundToFive(number) {
        return (number = Math.round(number * 100000) / 100000);
}

function operate() {
        secondNumber = Number(screenValCurrent);
        // alert(`currVal: ${screenValCurrent}, prevVal: ${screenValPrev}, opType: ${operateType}`)
        switch (operateType) {
                case '×':
                        result = firstNumber * secondNumber;
                        break;
                case '÷':
                        if (secondNumber == 0) {
                                alert(
                                        "Okay good one, let's not implode the universe shall we?"
                                );
                                clearScreen('CE');
                                return;
                        }
                        result = firstNumber / secondNumber;
                        break;
                case '+':
                        result = firstNumber + secondNumber;
                        break;
                case '-':
                        result = firstNumber - secondNumber;
                        break;
                default:
                        result = secondNumber;
                        break;
        }
        result = roundToFive(result);
        screenValPrev = screenValCurrent;
        screenPrev.textContent = screenValPrev;
        screenCurrent.textContent = result;
        screenValCurrent = result;
        opCount = 0;
}

inputEquals.addEventListener('click', operate);
