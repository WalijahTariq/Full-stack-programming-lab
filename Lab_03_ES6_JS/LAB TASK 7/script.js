const studentData = [
  { name: "Ali", age: 20, semester: 2, courses: ["OOP", "Math"] },
  { name: "Sara", age: 21, semester: 4, courses: ["AI", "DBMS"] },
  { name: "Ahmed", age: 19, semester: 1, courses: ["English", "Programming"] }
];

// Convert to JSON
const jsonData = JSON.stringify(studentData);

// Convert back to objects
const parsedData = JSON.parse(jsonData);

let output = "";

parsedData.forEach(({ name, age, semester, courses }) => {
  output += `
    <p>Name: ${name}</p>
    <p>Age: ${age}</p>
    <p>Semester: ${semester}</p>
    <p>Courses: ${courses.join(", ")}</p>
    <hr>
  `;
});

document.getElementById("students").innerHTML = output;