function fetchUsers() {
  const success = true;
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(success) resolve([
        {id:1,name:"Ali"},
        {id:2,name:"Sara"},
        {id:3,name:"Ahmed"}
      ]);
      else reject("Failed to load users");
    },3000);
  });
}

document.getElementById("loadUsersBtn").addEventListener("click", ()=>{
  document.getElementById("users").innerHTML="Loading...";
  fetchUsers()
    .then(users=>{
      document.getElementById("users").innerHTML=users.map(u=>`<p>${u.id} - ${u.name}</p>`).join("");
    })
    .catch(err=>document.getElementById("users").innerHTML=err);
});