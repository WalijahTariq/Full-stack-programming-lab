const products = new Map();

products.set(101, { name: "Laptop", price: 120000 });
products.set(102, { name: "Phone", price: 60000 });
products.set(103, { name: "Tablet", price: 40000 });
products.set(104, { name: "Mouse", price: 2000 });
products.set(105, { name: "Keyboard", price: 3000 });

// Search by ID
const searchId = 102;
const foundProduct = products.get(searchId);

// Delete a product
products.delete(105);

let output = "<h3>Available Products:</h3>";

products.forEach((value, key) => {
  output += `<p>ID: ${key} | ${value.name} - Rs.${value.price}</p>`;
});

output += `<p><strong>Total Products: ${products.size}</strong></p>`;

if (foundProduct) {
  output += `<p><strong>Search Result (ID 102): ${foundProduct.name}</strong></p>`;
}

document.getElementById("products").innerHTML = output;