// If the display contains Infinity or NaN, clear the display.
function infinityCheck(calcDisplay) {
  if (calcDisplay.val() === "Infinity" || calcDisplay.val() === "NaN") {
    clearDisplay(calcDisplay);
  }
}

// Removes all contents of the display.
function clearDisplay(calcDisplay) {
  // Set display to white.
  calcDisplay.css("background-color","#FFFFFF");
  calcDisplay.val("");
}

// Appends the contents of buffer to the display.
function appendDisplay(buffer, calcDisplay) {
  // Get current text in display.
  var currentText = calcDisplay.val();

  // Add new text.
  var newText = currentText + buffer;

  // Append new value to current and display.
  calcDisplay.val(newText);
}

// Deletes the last character from the display.
function deleteDisplay(calcDisplay) {
  // Get substring from 0 to length-1.
  var slicedString = calcDisplay.val().slice(0, calcDisplay.val().length - 1);

  // Display result
  calcDisplay.val(slicedString);
}

// Evaluates the display.
function evaluateDisplay(calcDisplay) {
  try {

    // Evaluate display contents.
    var buffer = eval(calcDisplay.val());

    // If the display contains "NaN" or "Infinity", set its color to red,
    // if not, set it to white.
    if (String(buffer) === "NaN" || String(buffer) === "Infinity") {

      calcDisplay.css("background-color","#F2DEDE");
    } else {
      calcDisplay.css("background-color","#FFFFFF");
    }

    // Displayy evaluation
    calcDisplay.val(buffer);
  }
  catch(err) {

    // Set background color of the display.
    calcDisplay.css("background-color","#F2DEDE");
  }
}



function keyDetection(calcDisplay) {
  $("body").keypress(function(e) {

    // Prevent default action of the key which was pressed.
    e.preventDefault();

    // Get the key code of the key pressed, and key character.
    var keyCode = e.keyCode;
    var keyChar = String.fromCharCode(keyCode);

    // Keycodes for regular 0-9: 48-57
    // Keycodes for numpad 0-9: 96-105
    // Keycodes for regular *+-./\: 42,43,45,46,47, 92
    // Keycodes for numpad *+-./: 106,107,109,110,111,187
    // Keycodes for = or enter: 13, 61
    // Keycodes for (): 40,41, 219,221
    // Keycodes for backspace or delete: 8, 46
    //
    // Create booleans for the above Keycodes
    var booleanCodeNumbers = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    var booleanCodeMathOperators = (keyCode === 42 || keyCode === 43 || keyCode === 45 || keyCode === 46 || keyCode === 47 || keyCode === 92 || keyCode === 106 || keyCode === 107) || (keyCode >= 109 && keyCode <= 111) || keyCode === 187;
    var booleanCodeEvaluate = (keyCode === 13 || keyCode === 61);
    var booleanCodeBrackets = (keyCode ===  40 || keyCode ===  41 || keyCode ===  219 || keyCode ===  221);
    var booleanCodeDelete = (keyCode === 8 || keyCode === 46);

    // Numbers, operators, brackets, will have their values appended to display.
    if (booleanCodeNumbers || booleanCodeMathOperators || booleanCodeBrackets) {

      // Numbers, operators, brackets.
      appendDisplay(keyChar, calcDisplay);

    } else if (booleanCodeEvaluate) {

      // Enter key or equal sign will evaluate.
      evaluateDisplay(calcDisplay);

    } else if (booleanCodeDelete) {

      // Delete or backspace removes last character in display.
      deleteDisplay(calcDisplay);
    }

  });
}

$(document).ready(function() {

  // Get current calculator display
  var calcDisplay = $("#calcDisplay");

  // Call function to deal with user input via keyboard.
  keyDetection(calcDisplay);

  // Get any button
  var button = $("button");

  button.on("click", function() {

    // Get button text
    var buttonText = $(this).text();

    if (buttonText === "AC") {

      clearDisplay(calcDisplay);

    } else if (buttonText === "Del") {
      infinityCheck(calcDisplay);
      deleteDisplay(calcDisplay);

    } else if (buttonText === "=") {
      infinityCheck(calcDisplay);
      evaluateDisplay(calcDisplay);

    } else {
      infinityCheck(calcDisplay);
      appendDisplay(buttonText, calcDisplay);

    }
  });

});
