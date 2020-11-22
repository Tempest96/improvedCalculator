/**
 * Get element by ID
 * @param {string} a
 * @return {element} element
 */
let getElById = function (a) {
  return document.getElementById(a);
};

let mainInput = getElById("main");

/**
 * Contain all functions.
 * @param {string} string
 */
let mainFuction = function (string) {
  let allNumbs = []; //Array of strings (all numbers and symbols)
  let num = ""; // змінна яка використовується в парсанні стрічки на масив чисел

  /**
   * Searching for brackets.
   * @param {string} cloneString
   * Receive new string without brackets.
   */
  function searchForBrackets(cloneString) {
    for (let i = 0; i < cloneString.length; i++) {
      let count = 0; // count of brackets
      if (cloneString[i] === "(") { //first left Bracket
        for (let j = i + 1; j < cloneString.length; j++) {
          if (cloneString[j] === "(") { // left Braket in Brackets
            count++;
          } else if (cloneString[j] === ")" && count > 0) { // right Braket in Brackets
            count--;
          } else if (cloneString[j] === ")" && count === 0) { //last right Bracket
            let valueInBrackets = cloneString.substr(i, j - i + 1);
            let stringWithoutBrackets = new mainFuction(
              valueInBrackets.substr(1, cloneString.length - 1)
            );
            let resultFromBrackets = stringWithoutBrackets.allFunc(); // recursion
            string = string.replace(valueInBrackets, resultFromBrackets);
            break;
          }
        }
      }
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for some exclusions.
   * @param {string} string
   * Creating array of strings allNumbs.
   */
  function pars() {
    for (let i = 0; i < string.length; i++) {
      if (string[i] == "-" && string[i - 1] * 1 != string[i - 1]) {
        num += "-";
      } // exclusion for negative numbers.
      else if (string[i] * 1 == string[i] || string[i] == ".") {
        num += string[i];
        if (i == string.length - 1) {
          //якщо це останній елемент строки то запихаємо в масив
          allNumbs.push(num);
        }
      } // exclusion for numbers that consists from 2 symbols > 9 . And decimal numbers .
      else if (
        string[i] * 1 != string[i] &&
        string[i] != "c" &&
        string[i] != "s"
      ) {
        allNumbs.push(num);
        allNumbs.push(string[i]);
        num = "";
      } else if (string[i] == "c" || string[i] == "s") {
        num = "" + string[i] + "" + string[i + 1] + string[i + 2];
        allNumbs.push(num);
        num = "";
        i += 2;
      } // exclusion for cosinus,sinus , ^ .
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for sinus.
   * Perform a mathematical operation
   * Return array allNumbs with result instead sinus.
   */
  function sin() {
    for (let i = 0; i < allNumbs.length; i++) {
      if (allNumbs[i] === "sin") {
        allNumbs[i] = Math.sin(parseFloat(allNumbs[i + 1])).toFixed(2);
        allNumbs.splice(i + 1, 1);
        i = 0;
      }
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for cosinus.
   * Perform a mathematical operation
   * Return array allNumbs with result instead cosinus.
   */
  function cos() {
    for (let i = 0; i < allNumbs.length; i++) {
      if (allNumbs[i] === "cos") {
        allNumbs[i] = Math.cos(parseFloat(allNumbs[i + 1])).toFixed(2);
        i++;
        allNumbs.splice(i, 1);
        i = 0;
      }
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for sqr.
   * Perform a mathematical operation
   * Return array allNumbs with result instead sqr.
   */
  function sqr() {
    for (let i = 0; i < allNumbs.length; i++) {
      if (allNumbs[i] === "sqr") {
        allNumbs[i] = Math.sqrt(parseFloat(allNumbs[i + 1])).toFixed(2);
        allNumbs.splice(i + 1, 1);
        i = 0;
      }
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for degree symbol.
   * Perform a mathematical operation
   * Return array allNumbs with result instead degree symbol.
   */
  function pow() {
    for (let i = 0; i < allNumbs.length; i++) {
      if (allNumbs[i] === "^") {
        allNumbs[i - 1] = Math.pow(
          parseFloat(allNumbs[i - 1]),
          parseFloat(allNumbs[i + 1])
        );
        allNumbs.splice(i, 2);
        i = 0;
      }
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for multiply or divison symbol.
   * Perform a mathematical operation
   * Return array allNumbs with result instead multiply or divison symbol.
   */

  function multiplyDivison() {
    for (let i = 0; i < allNumbs.length; i++) {
      if (allNumbs[i] === "*") {
        allNumbs[i - 1] =
          parseFloat(allNumbs[i - 1]) * parseFloat(allNumbs[i + 1]);
        allNumbs.splice(i, 2);
        i = 0;
      } else if (allNumbs[i] === "/") {
        allNumbs[i - 1] =
          parseFloat(allNumbs[i - 1]) / parseFloat(allNumbs[i + 1]);
        allNumbs.splice(i, 2);
        i = 0;
      }
    }
  }

  /**
   * Passing trough the cycle.
   * Checking for addition or substraction symbol.
   * Perform a mathematical operation
   * Return array allNumbs with result instead addition or substraction symbol.
   */
  function addOrSub() {
    for (let i = 0; i < allNumbs.length; i++) {
      if (allNumbs[i] === "-") {
        allNumbs[i - 1] =
          parseFloat(allNumbs[i - 1]) - parseFloat(allNumbs[i + 1]);
        allNumbs.splice(i, 2);
        i = 0;
      } else if (allNumbs[i] === "+") {
        allNumbs[i - 1] =
          parseFloat(allNumbs[i - 1]) + parseFloat(allNumbs[i + 1]);
        allNumbs.splice(i, 2);
        i = 0;
      }
    }
  }

  /**
   * Perform all functions in the correct order.
   * Return result
   * @return {number} allNumbs[0]
   */
  this.allFunc = function () {
    if (string.includes(")") || string.includes("(")) {
      searchForBrackets(string);
    }

    pars(string);

    if (string.includes("sin")) {
      sin();
    }
    if (string.includes("cos")) {
      cos();
    }
    if (string.includes("sqr")) {
      sqr();
    }
    if (string.includes("^")) {
      pow();
    }
    if (string.includes("*") || string.includes("/")) {
      multiplyDivison();
    }
    if (string.includes("+") || string.includes("-")) {
      addOrSub();
    }

    return allNumbs[0];
  };
};

/**
 * Add button.value onClick to mainInput
 */
$(".but").click(function () {
  mainInput.value += this.value;
});

/**
 * Get value of input(mainInput),calculate and show the result
 * create new string mainFuction with @param {string} mainInput
 * @return {array} allNumbs[0]
 */
$("#con").click(function () {
  let newString = new mainFuction(mainInput.value);
  $(".prev").append(
    "<p>" + mainInput.value + "=" + newString.allFunc() + "</p>"
  );
  mainInput.value = newString.allFunc();
});

/**
 * Show / hide previous result window
 */
$("a").click(function () {
  $(".prev").toggle();
});

/**
 * Clear input screen.
 */
$(".butC").click(function () {
  mainInput.value = "";
});
