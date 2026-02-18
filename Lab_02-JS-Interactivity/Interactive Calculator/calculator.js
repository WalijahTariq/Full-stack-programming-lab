// Function to perform calculation
function calculate() {
  // Get input values
  let a = Number(document.getElementById("n1").value);
  let b = Number(document.getElementById("n2").value);
  let operation = document.getElementById("op").value;

  let output = document.getElementById("output");
  let result;

  // Validate division by zero
  if (operation === "/" && b === 0) {
    output.innerHTML = "❌ Cannot divide by zero";
    output.style.background = "#fecaca"; // red background
    console.warn("Attempted division by zero!");
    return;
  }

  // Perform operation
  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    default:
      result = "Invalid operation";
  }

  // Display result in DOM
  output.innerHTML = "Result: " + result;

  // Change background color depending on result
  if (result > 0) {
    output.style.background = "#bbf7d0"; // green for positive
    output.style.color = "#065f46";
  } else if (result < 0) {
    output.style.background = "#fecaca"; // red for negative
    output.style.color = "#991b1b";
  } else {
    output.style.background = "#e0e7ff"; // neutral for zero
    output.style.color = "#1e3a8a";
  }

  // Log inputs and result to console
  console.log("Calculator Submission:");
  console.log("Input 1:", a);
  console.log("Input 2:", b);
  console.log("Operation:", operation);
  console.log("Result:", result);
}
