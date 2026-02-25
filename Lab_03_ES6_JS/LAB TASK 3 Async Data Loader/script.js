function fetchUsers() {
  const isSuccess = true;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve([
          { id: 1, name: "Ali" },
          { id: 2, name: "Sara" },
          { id: 3, name: "Ahmed" }
        ]);
      } else {
        reject("Failed to load users.");
      }
    }, 3000);
  });
}

fetchUsers()
  .then(users => {
    let output = "";
    users.forEach(user => {
      output += `<p>${user.id} - ${user.name}</p>`;
    });
    document.getElementById("users").innerHTML = output;
  })
  .catch(error => {
    document.getElementById("users").innerHTML = error;
  });