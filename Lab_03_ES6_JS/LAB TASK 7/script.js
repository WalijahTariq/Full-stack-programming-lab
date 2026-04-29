// Step 1: Create 3 student objects
const students = [
  {
    name: "Ali",
    age: 20,
    semester: 4,
    courses: ["OOP", "DBMS", "DSA"]
  },
  {
    name: "Sara",
    age: 21,
    semester: 5,
    courses: ["AI", "Web Dev", "CN"]
  },
  {
    name: "Ahmed",
    age: 19,
    semester: 3,
    courses: ["Math", "Physics", "Programming"]
  }
];

let jsonData = "";

// Step 2: Convert to JSON
function convertToJSON() {
  jsonData = JSON.stringify(students, null, 2);
  document.getElementById("jsonOutput").textContent = jsonData;
  document.getElementById("studentDisplay").innerHTML = "";
}

// Step 3: Convert JSON back to objects
function parseJSON() {
  if (!jsonData) {
    alert("First convert to JSON!");
    return;
  }

  const parsedStudents = JSON.parse(jsonData);

  // Step 6: Loop using forEach
  let output = "";

  parsedStudents.forEach(student => {

    // Step 4: Destructuring
    const { name, age, semester, courses } = student;

    output += `
      <div class="student">
        <strong>Name:</strong> ${name} <br>
        <strong>Age:</strong> ${age} <br>
        <strong>Semester:</strong> ${semester} <br>
        <strong>Courses:</strong> ${courses.join(", ")}
        <hr>
      </div>
    `;
  });

  // Step 5: Display in HTML using innerHTML
  document.getElementById("studentDisplay").innerHTML = output;
}