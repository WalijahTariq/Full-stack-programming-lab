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

const students = [];

function displayStudents() {
  document.getElementById("students").innerHTML = students.map(s => s.getDetails()).join("");
}

document.getElementById("addStudentBtn").addEventListener("click", () => {
  const id = Number(document.getElementById("stuId").value);
  const name = document.getElementById("stuName").value;
  const semester = Number(document.getElementById("stuSemester").value);
  const courses = document.getElementById("stuCourses").value.split(",").map(c => c.trim());

  if(!id || !name || !semester) { alert("Please fill all fields"); return; }

  students.push(new Student(id,name,semester,courses));
  displayStudents();
});