let a1 = "islamabad";
let a2 = 5;
let a3 = "javascript";

function checkQuiz() {
  let score = 0;

  if (q1.value.toLowerCase() === a1) score++;
  if (Number(q2.value) === a2) score++;
  if (q3.value.toLowerCase() === a3) score++;

  let msg = "";

  if (score === 3)
    msg = "🎯 Perfect! Score: 3/3";
  else if (score === 2)
    msg = "🙂 Good! Score: 2/3";
  else
    msg = "😬 Try again. Score: " + score + "/3";

  // Display on page
  result.innerHTML = msg;

  //  Log to console
  console.log("Quiz Submission:");
  console.log("Q1:", q1.value, "| Correct:", a1);
  console.log("Q2:", q2.value, "| Correct:", a2);
  console.log("Q3:", q3.value, "| Correct:", a3);
  console.log("Total Score:", score, "/3");
}

function resetQuiz() {
  q1.value = "";
  q2.value = "";
  q3.value = "";
  result.innerHTML = "";
}
