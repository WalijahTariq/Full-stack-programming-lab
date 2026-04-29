// Student Class
class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.courses = new Set(); // Set prevents duplicates
  }

  registerCourse(course) {
    this.courses.add(course);
  }
}

// Store students in Map
const studentMap = new Map();

// Add Student
document.getElementById("addStudentBtn").addEventListener("click", () => {
  const id = Number(document.getElementById("studentId").value);
  const name = document.getElementById("studentName").value;

  if (!id || !name) {
    alert("Please enter valid student details.");
    return;
  }

  if (studentMap.has(id)) {
    alert("Student with this ID already exists.");
    return;
  }

  const newStudent = new Student(id, name);
  studentMap.set(id, newStudent);

  displayStudents();
});

// Register Course
document.getElementById("addCourseBtn").addEventListener("click", () => {
  const id = Number(document.getElementById("courseStudentId").value);
  const course = document.getElementById("courseName").value;

  if (!studentMap.has(id)) {
    alert("Student not found.");
    return;
  }

  studentMap.get(id).registerCourse(course);
  displayStudents();
});

// Simulate Saving Data
function saveData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data saved successfully!");
    }, 2000);
  });
}

document.getElementById("saveBtn").addEventListener("click", () => {
  document.getElementById("portal").innerHTML = "Saving data...";

  saveData().then(message => {
    displayStudents(message);
  });
});

// Display Students
function displayStudents(message = "") {
  let output = "";

  if (message) {
    output += `<h3>${message}</h3>`;
  }

  studentMap.forEach(student => {
    output += `
      <div class="card">
        <h3>${student.name}</h3>
        <p>ID: ${student.id}</p>
        <p>Courses: ${[...student.courses].join(", ") || "None"}</p>
        <p>Total Courses: ${student.courses.size}</p>
      </div>
    `;
  });

  document.getElementById("portal").innerHTML = output;
}