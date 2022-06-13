console.log("Project Kalkulator dengan JavaScript!");

// const firstName = prompt("Insert Your First Name: ");
// const lastName = prompt("Insert Your Last Name: ");
// let language = prompt("Language You Speak: ");

// const user = {
//   name: {
//     first: firstName,
//     last: firstName,
//   },
//   language: language,
// };

// language = user.language.toLowerCase();

// if (user.language === "indonesia" || user.language === "Indonesia") {
//   alert(`Hai, ${firstName} ${lastName}! Selamat datang di Calculator kami!`);
// } else if (user.language === "france" || user.language === "France") {
//   alert(`Bonjour, ${firstName} ${lastName}! Ravi de vous rencontrer!`);
// } else {
//   alert(`Hi, ${firstName} ${lastName}! Welcome to our Calculator!`);
// }

// Membuat object calculator untuk menampung nilai angka dan yang lain
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

// Fungsi mengupdate angka display
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Fungsi button hapus
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// Fungsi input angka
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// Membuat button click events
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    function inverseNumber() {
      if (calculator.displayNumber === "0") {
        return;
      }
      calculator.displayNumber = calculator.displayNumber * -1;
    }

    function handleOperator(operator) {
      if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = "0";
      } else {
        alert("Operator sudah ditetapkan");
      }
    }

    function performCalculation() {
      if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator!");
        return;
      }

      let result = 0;
      if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
      } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
      }

      calculator.displayNumber = result;
    }

    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // target= button CE
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // target= button negative
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // target= button equals
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    // target= button operator
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
    //  clearCalculator();
  });
}
