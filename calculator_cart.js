// Store the cart items in an array
let cartItems = [];

// Get the necessary elements from the DOM
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartListElement = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');
const closeBtn = document.querySelector('.close');
const viewCartButton = document.getElementById('view-cart-button');

// Add click event listeners to each "Add to Cart" button
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Event listener for the "View Cart" button
viewCartButton.addEventListener('click', openCartModal);

// Event listener for the close button of the modal
closeBtn.addEventListener('click', closeCartModal);

// Function to open the cart modal
function openCartModal() {
  cartModal.style.display = 'block';
  updateCartDisplay();
}

// Function to close the cart modal
function closeCartModal() {
  cartModal.style.display = 'none';
}

// Function to add an item to the cart
function addToCart(event) {
  const itemElement = event.target.closest('.single-blog-style1');
  const itemName = itemElement.querySelector('.blog-title a').textContent;
  const itemPrice = 10; // Replace with the actual price of the item

  const item = {
    name: itemName,
    price: itemPrice
  };

  cartItems.push(item);

  updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
  cartListElement.innerHTML = '';

  let totalPrice = 0;

  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartListElement.appendChild(listItem);

    totalPrice += item.price;
  });

  cartTotalElement.textContent = totalPrice.toFixed(2);
}
