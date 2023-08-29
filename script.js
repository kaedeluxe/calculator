const query = (query) => document.querySelector(query),
        queryAll = (query) => document.querySelectorAll(query),
        currScreen = query('.screenText'),
        prevScreen = query('.screenPrev'),
        btnDigitsAll = queryAll('.digit'),
        btnClearAll = queryAll('.clear'),
        btnDecimal = query('.decimal'),
        btnEquals = query('.equals'),
        btnOpsAll = queryAll('.operation');

let runningTotal,
        prevBuffer = 0,
        currBuffer = '',
        screenBuffer = '',
        operator,
        opCount = 0,
        result = 0;

// Operations

function operate() {
        if (!runningTotal) {
                runningTotal = Number(prevBuffer);
        }
        currBuffer = Number(currBuffer);
        prevBuffer = Number(prevBuffer);
        switch (operator) {
                case '×':
                        result = runningTotal * currBuffer;
                        break;
                case '÷':
                        if (currBuffer == 0) {
                                alert(
                                        "Okay good one, let's not implode the universe shall we?"
                                );
                                clearScreen('CE');
                                return;
                        }
                        result = runningTotal / currBuffer;
                        break;
                case '+':
                        result = runningTotal + currBuffer;
                        break;
                case '-':
                        result = runningTotal - currBuffer;
                        break;
                default:
                        result = runningTotal;
                        break;
        }
        result = roundToFive(result);
        runningTotal = result;
        currScreen.textContent = result;
}

// Digits

function digitToBuffer(data) {
        if (currScreen.textContent == '0') {
                currScreen.textContent = '';
        }
        if (currBuffer == '') {
                currScreen.textContent = '';
        }
        currScreen.textContent += data;
        screenBuffer += data;
        currBuffer += data;
}

btnDigitsAll.forEach((button) => {
        let data = button.getAttribute('data-input');
        button.addEventListener('click', () => {
                digitToBuffer(data);
        });
});

// Operators

function getOperateType(data) {
        currScreen.textContent = '';
        if (opCount != 0) {
                operate();
        }
        operator = data;
        if (currBuffer) {
                prevBuffer = currBuffer;
        } else {
                prevBuffer = 0;
                screenBuffer = '0';
        }
        screenBuffer += ` ${operator} `;
        prevScreen.textContent = screenBuffer;
        currBuffer = 0;
        opCount++;
}

btnOpsAll.forEach((button) => {
        let data = button.getAttribute('data-input');
        button.addEventListener('click', () => {
                getOperateType(data);
        });
});

// Decimal

btnDecimal.addEventListener('click', () => {
        if (currBuffer.includes('.')) {
                return;
        } else {
                currScreen.textContent += '.';
                currBuffer += '.';
                screenBuffer += '.';
        }
});

function roundToFive(number) {
        return (number = Math.round(number * 100000) / 100000);
}

// Equals

function displayResult() {
        operate();
        prevScreen.textContent = '';
        screenBuffer = result;
        opCount = 0;
}

btnEquals.addEventListener('click', displayResult);

// Clear buttons

function clearScreen(data) {
        switch (data) {
                case 'CE':
                        currScreen.textContent = '0';
                        currBuffer = '';
                        break;
                case 'C':
                        currScreen.textContent = '0';
                        runningTotal = '';
                        prevScreen.textContent = '';
                        prevBuffer = '';
                        currBuffer = '';
                        screenBuffer = '';
                        opCount = 0;
                        result = 0;
                        break;
                case 'Back':
                        currBuffer = currBuffer.split('');
                        currBuffer.splice(-1, 1);
                        currBuffer = currBuffer.join('');
                        screenBuffer = screenBuffer.split('');
                        screenBuffer.splice(-1, 1);
                        screenBuffer = screenBuffer.join('');
                        currScreen.textContent = currBuffer;
                        break;
        }
}

btnClearAll.forEach((button) => {
        let data = button.getAttribute('data-input');
        button.addEventListener('click', () => {
                clearScreen(data);
        });
});
