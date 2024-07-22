const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const favoriteItems = document.getElementById("favorite-items");

// Sample cart items (replace with actual data fetching logic)
const items = [
    { name: "Product 1", price: 19.99, quantity: 1, liked: false },
    { name: "Product 2", price: 9.99, quantity: 2, liked: false },
    // ... your actual product data
];

// Function to render the entire cart
function renderCart() {
    cartItems.innerHTML = ""; // Clear previous items
    let total = 0;

    items.forEach((item, index) => {
        // Create a new item element
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        // Set the item's HTML content (including dynamic values)
        itemElement.innerHTML = `
            <div class="name">${item.name}</div>
            <div class="price">${item.price.toFixed(2)} DH</div>
            <div class="quantity">
                <button class="btn minus">-</button>
                ${item.quantity}
                <button class="btn plus">+</button>
            </div>
            <i class="like-btn fas fa-heart ${item.liked ? "liked" : ""}"></i>
            <button class="delete-btn">Delete</button>
        `;

        // Calculate total price
        total += item.price * item.quantity;

        // Get references to the buttons within this item
        const minusBtn = itemElement.querySelector(".minus");
        const plusBtn = itemElement.querySelector(".plus");
        const likeBtn = itemElement.querySelector(".like-btn");
        const deleteBtn = itemElement.querySelector(".delete-btn");

        // Event listeners for button clicks
        minusBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                renderCart(); // Re-render after changes
            }
        });

        plusBtn.addEventListener("click", () => {
            item.quantity++;
            renderCart();
        });

        likeBtn.addEventListener("click", () => {
            item.liked = !item.liked; // Toggle liked status
            renderCart(); // Re-render after changes
        });

        deleteBtn.addEventListener("click", () => {
            items.splice(index, 1); // Remove item from array
            renderCart();
        });

        cartItems.appendChild(itemElement); // Add item to the cart
    });

    // Update total price display
    totalDisplay.textContent = `Total: ${total.toFixed(2)} DH`;

    // Render favorite items
    renderFavorites();
}

// Function to render favorite items
function renderFavorites() {
    favoriteItems.innerHTML = ""; // Clear previous items

    const likedItems = items.filter(item => item.liked);

    likedItems.forEach(item => {
        // Create a new item element
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        // Set the item's HTML content (including dynamic values)
        itemElement.innerHTML = `
            <div class="name">${item.name}</div>
            <div class="price">${item.price.toFixed(2)} DH</div>
        `;

        favoriteItems.appendChild(itemElement); // Add item to the favorites
    });
}

// Initial rendering of the cart when the page loads
renderCart();
