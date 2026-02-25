class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses;
  }

  getDetails() {
    return `
      <div class="card">
        <h3>${this.name}</h3>
        <p>ID: ${this.id}</p>
        <p>Semester: ${this.semester}</p>
        <p>Courses: ${this.courses.join(", ")}</p>
      </div>
    `;
  }
}

const student1 = new Student(1, "Ali", 2, ["Math", "OOP"]);
const student2 = new Student(2, "Sara", 4, ["DBMS", "AI"]);
const student3 = new Student(3, "Ahmed", 1, ["English", "Programming"]);

const students = [student1, student2, student3];

let output = "";
students.forEach(student => {
  output += student.getDetails();
});

document.getElementById("students").innerHTML = output;