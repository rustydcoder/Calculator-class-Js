"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator(previousOperandElement, currentOperandElement) {
    _classCallCheck(this, Calculator);

    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.currentOperand = " ";
      this.previousOperand = " ";
      this.operation = undefined;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.currentOperand === " ") return;

      if (this.previousOperand !== " ") {
        this.compute();
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = " ";
    }
  }, {
    key: "compute",
    value: function compute() {
      var computation = " ";
      var previous = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (isNaN(previous || isNaN(current))) return;

      switch (this.operation) {
        case "+":
          computation = previous + current;
          break;

        case "-":
          computation = previous - current;
          break;

        case "÷":
          computation = previous / current;
          break;

        case "×":
          computation = previous * current;
          break;

        default:
          return;
      }

      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = " ";
    }
  }, {
    key: "getDisplayNumbers",
    value: function getDisplayNumbers(number) {
      var stringNumber = number.toString();
      var intergerDigits = parseFloat(stringNumber.split(".")[0]);
      var decimalDigits = stringNumber.split(".")[1];
      var numberDisplay = " ";

      if (isNaN(intergerDigits)) {
        numberDisplay = " ";
      } else {
        numberDisplay = intergerDigits.toLocaleString("en", {
          maximumFractionDigits: 0
        });
      }

      if (decimalDigits != null) {
        return "".concat(numberDisplay, ".").concat(decimalDigits);
      } else {
        return numberDisplay;
      }
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentOperandElement.innerText = this.getDisplayNumbers(this.currentOperand);

      if (this.operation != null) {
        this.previousOperandElement.innerText = "".concat(this.getDisplayNumbers(this.previousOperand), " ").concat(this.operation);
      } else {
        this.previousOperandElement.innerText = " ";
      }
    }
  }]);

  return Calculator;
}();

var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousOperandElement = document.querySelector('[data-previous-operand]');
var currentOperandElement = document.querySelector('[data-current-operand]');
var calculator = new Calculator(previousOperandElement, currentOperandElement);
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener('click', function (button) {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener('click', function (button) {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', function (button) {
  calculator["delete"]();
  calculator.updateDisplay();
});
var today = new Date();
today = today.toDateString();
document.getElementById("date").innerHTML = today;
