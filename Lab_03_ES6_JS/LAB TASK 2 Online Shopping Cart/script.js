let cart = [];

function addToCart(...items) { cart.push(...items); }

document.getElementById("addProductBtn").addEventListener("click", () => {
  const product = document.getElementById("productName").value.trim();
  if(product) { addToCart(product); displayCart(); }
});

function displayCart() {
  const [firstItem] = cart;
  document.getElementById("cart").innerHTML = `
    <p>Total Items: ${cart.length}</p>
    <p>First Item: ${firstItem || "None"}</p>
    <p>Updated Cart: ${cart.join(", ") || "Empty"}</p>
  `;
}