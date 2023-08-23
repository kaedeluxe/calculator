const query = (query) => document.querySelector(query),
  queryAll = (query) => document.querySelectorAll(query),
  createEl = (element) => document.createElement(element),
  screenText = query(".screenText"),
  screenPrev = query(".screenPrev"),
  buttonsAll = queryAll(".buttonBackground"),
  inputDigits = queryAll(".digit"),
  buttonClearAll = queryAll(".clear"),
  buttonDecimal = query(".decimal"),
  inputEquals = query(".equals"),
  inputOperations = queryAll(".operation");

let firstNumber,
  operation,
  opCount = 0,
  secondNumber,
  screenValFirst,
  screenValCurrent = "",
  outputNumber;

function clearScreen(clearType) {
  switch (clearType) {
    case "C":
      screenText.textContent = "0";
      screenValCurrent = "";
      firstNumber = "";
      break;
    case "CE":
      screenText.textContent = "0";
      screenPrev.textContent = "0";
      screenValCurrent = "";
      screenValFirst = "";
      firstNumber = "";
      secondNumber = "";
      outputNumber = "";
      opCount = 0;
      break;
    case "Back":
      screenText.textContent = "idfk";
      break;
  }
}

inputDigits.forEach((button) => {
  button.addEventListener("click", () => {
    if (screenText.textContent == "0") {
      screenText.textContent = button.getAttribute("data-input");
    } else {
      screenText.textContent += button.getAttribute("data-input");
    }
    screenValCurrent += button.getAttribute("data-input");
  });
});

inputOperations.forEach((button) => {
  button.addEventListener("click", () => {
    if (opCount > 0) {
      operate();
    }
    operation = button.getAttribute("data-input");
    opCount++;
    screenValFirst = screenValCurrent;
    screenPrev.textContent = screenValFirst;
    clearScreen("C");
    screenValCurrent = "";
    screenText.textContent = `${operation} `;
  });
});

buttonClearAll.forEach((button) => {
  button.addEventListener("click", () => {
    clearScreen(button.getAttribute("data-input"));
  });
});

buttonDecimal.addEventListener("click", () => {
  if (screenValCurrent.includes(".")) {
    return;
  } else {
    screenText.textContent += ".";
    screenValCurrent += ".";
  }
});

function operate() {
  firstNumber = Number(screenValFirst);
  secondNumber = Number(screenValCurrent);
  switch (operation) {
    case "×":
      outputNumber = firstNumber * secondNumber;
      break;
    case "÷":
      if (secondNumber == 0) {
        alert("Okay good one, let's not implode the universe shall we?");
        clearScreen("CE");
        return;
      }
      outputNumber = firstNumber / secondNumber;
      break;
    case "+":
      outputNumber = firstNumber + secondNumber;
      break;
    case "-":
      outputNumber = firstNumber - secondNumber;
      break;
  }
  outputNumber = Math.round(outputNumber * 100000) / 100000;
  screenText.textContent = outputNumber;
  screenValCurrent = outputNumber;
  opCount = 0;
}

inputEquals.addEventListener("click", operate);
