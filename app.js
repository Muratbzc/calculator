const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");
const display2 = document.querySelector(".display2");

let firstNumber = "";
let secondNumber = "";
let waitingForSecondNumber = false;
let operator = null;

buttons.addEventListener("click", (e) => {
  if (e.target.classList.contains("button-ac")) {
    display.innerText = 0;
    firstNumber = "";
    secondNumber = "";
    waitingForSecondNumber = false;
    cssReset();
  }

  if (e.target.classList.contains("button-mark")) {
    display.innerText = display.innerText * -1;
  }

  if (e.target.classList.contains("button-percent")) {
    display.innerText = display.innerText * 0.01;
  }

  if (e.target.classList.contains("num")) {
    addOutput(e);
  }

  if (e.target.classList.contains("operator")) {
    handleOperator(e);
    cssReset();
    e.target.classList.add("active");
  }

  if (e.target.classList.contains("button-decimal")) {
    if (!display.innerText.includes(".")) {
      display.innerText += ".";
      waitingForSecondNumber = false;
    }
  }

  if (e.target.classList.contains("button-equal")) {
    if (firstNumber && waitingForSecondNumber == false) {
      secondNumber = Number(display.innerText);
      display.innerText = calculate(operator);
      firstNumber = Number(display.innerText);
      waitingForSecondNumber = true;
    } else if (firstNumber && waitingForSecondNumber == true) {
      display.innerText = calculate(operator);
      firstNumber = Number(display.innerText);
    }
    cssReset();
  }

  console.log("firstnum", firstNumber);
  console.log("secondnum", secondNumber);
  console.log("oper", operator);
  console.log(waitingForSecondNumber);
});

function addOutput(e) {
  if (waitingForSecondNumber == true || display.innerText == 0) {
    display.innerText = "";
    waitingForSecondNumber = false;
  }
  display.innerText += e.target.innerText;
}

function handleOperator(e) {
  if (!firstNumber) {
    operator = e.target.value;
    firstNumber = Number(display.innerText);
    waitingForSecondNumber = true;
  } else if (waitingForSecondNumber == false) {
    secondNumber = Number(display.innerText);
    display.innerText = calculate(operator);
    operator = e.target.value;
    firstNumber = Number(display.innerText);
    waitingForSecondNumber = true;
  }
  operator = e.target.value;
}

const calculate = (operator) => {
  if (operator == "+") {
    return firstNumber + secondNumber;
  } else if (operator == "-") {
    return firstNumber - secondNumber;
  } else if (operator == "*") {
    return firstNumber * secondNumber;
  } else if (operator == "/") {
    return firstNumber / secondNumber;
  }
};

function cssReset() {
  document.querySelectorAll(".operator").forEach((a) => {
    a.classList.remove("active");
  });
}
