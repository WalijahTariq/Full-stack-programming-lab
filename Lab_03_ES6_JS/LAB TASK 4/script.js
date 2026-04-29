const registeredCourses = new Set();

document.getElementById("addCourseBtn").addEventListener("click", ()=>{
  const course=document.getElementById("newCourse").value.trim();
  if(course){ registeredCourses.add(course); displayCourses(); }
});

function displayCourses(){
  let output="<h3>Registered Courses:</h3>";
  for(const course of registeredCourses) output+=`<p>${course}</p>`;
  output+=`<p>Total Unique Courses: ${registeredCourses.size}</p>`;
  document.getElementById("courses").innerHTML=output;
}