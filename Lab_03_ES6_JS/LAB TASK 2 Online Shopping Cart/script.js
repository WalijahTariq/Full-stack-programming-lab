let cart = [];

function addToCart(...items) {
  cart.push(...items);
}

// Add products
addToCart("Laptop", "Mouse", "Keyboard");

// Clone cart using Spread
const updatedCart = [...cart];

// Destructure
const [firstItem, ...restItems] = updatedCart;

document.getElementById("cart").innerHTML = `
  <p>Total Items: ${updatedCart.length}</p>
  <p>First Item: ${firstItem}</p>
  <p>Updated Cart: ${updatedCart.join(", ")}</p>
`;