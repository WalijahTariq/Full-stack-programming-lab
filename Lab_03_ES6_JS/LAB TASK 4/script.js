const registeredCourses = new Set();

// Adding courses
registeredCourses.add("OOP");
registeredCourses.add("DBMS");
registeredCourses.add("AI");
registeredCourses.add("OOP"); // duplicate attempt

let output = "<h3>Registered Courses:</h3>";

for (const course of registeredCourses) {
  output += `<p>${course}</p>`;
}

output += `<p><strong>Total Unique Courses: ${registeredCourses.size}</strong></p>`;

document.getElementById("courses").innerHTML = output;