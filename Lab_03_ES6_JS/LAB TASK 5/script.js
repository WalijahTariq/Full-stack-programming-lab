// Create Map (Key = ID, Value = Product Object)
const products = new Map();

// Add minimum 5 products
products.set(1, { name: "Laptop", price: 800 });
products.set(2, { name: "Phone", price: 500 });
products.set(3, { name: "Tablet", price: 300 });
products.set(4, { name: "Headphones", price: 100 });
products.set(5, { name: "Smartwatch", price: 200 });

// Display all products
function displayProducts() {
  const productList = document.getElementById("productList");
  const totalProducts = document.getElementById("totalProducts");

  productList.innerHTML = "";

  products.forEach((product, id) => {
    productList.innerHTML += `
      <div>
        <strong>ID:</strong> ${id} <br>
        <strong>Name:</strong> ${product.name} <br>
        <strong>Price:</strong> $${product.price}
      </div>
    `;
  });

  totalProducts.textContent = products.size;
}

// Search product by ID
function searchProduct() {
  const id = Number(document.getElementById("searchId").value);
  const resultDiv = document.getElementById("searchResult");

  if (products.has(id)) {
    const product = products.get(id);
    resultDiv.innerHTML = `
      <p><strong>Found:</strong></p>
      ID: ${id} <br>
      Name: ${product.name} <br>
      Price: $${product.price}
    `;
  } else {
    resultDiv.innerHTML = "<p>Product not found.</p>";
  }
}

// Delete product by ID
function deleteProduct() {
  const id = Number(document.getElementById("deleteId").value);

  if (products.delete(id)) {
    alert("Product deleted successfully!");
  } else {
    alert("Product not found.");
  }

  displayProducts();
}

// Initial display
displayProducts();