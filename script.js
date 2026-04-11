// 1. Simple object to store product quantities: { productId: quantity }
let cartData = {};

/**
 * SEARCH FUNCTION:
 * Filters products based on the text typed in the search bar.
 */
function filterProducts() {
    // Get the text from the search input and make it lowercase
    let input = document.getElementById('product-search').value.toLowerCase();
    
    // Get all product cards and the "No Results" message div
    let cards = document.querySelectorAll('.product-card');
    let message = document.getElementById('no-results');
    
    // Track if we found at least one match
    let foundAny = false;

    // Loop through every card one by one
    for (let i = 0; i < cards.length; i++) {
        // Get the title of the current product
        let title = cards[i].querySelector('.product-title').textContent.toLowerCase();
        
        // Check if the search text is inside the title
        if (title.indexOf(input) > -1) {
            cards[i].style.display = ""; // Show it
            foundAny = true;            // Mark that we found something
        } else {
            cards[i].style.display = "none"; // Hide it
        }
    }

    // If the loop finished and nothing was found, show the "No Results" message
    if (foundAny == true) {
        message.style.display = "none";
    } else {
        message.style.display = "block";
    }
}

/**
 * CART LOGIC:
 * Initializes the quantity selector when "Add to Cart" is first clicked.
 */
function initQuantity(productId, btn) {
    // The "container" is the parent div of the button
    let container = btn.parentElement;
    
    // Hide the main "Add to Cart" button
    btn.style.display = 'none';
    
    // Find the +/- selector div and show it
    let selector = container.querySelector('.qty-selector');
    if (selector) {
        selector.style.display = 'flex';
    }
    
    // Set starting quantity to 1 in our data
    cartData[productId] = 1;
    
    // Update the numbers on the screen
    updateGlobalUI(productId);
}

/**
 * Changes product quantity (Add or Subtract)
 */
function changeQty(productId, delta) {
    // If product isn't in cart, stop
    if (!cartData[productId]) {
        return;
    }

    // Add delta (1 or -1) to the current quantity
    cartData[productId] = cartData[productId] + delta;

    // If quantity hits 0, remove it and go back to "Add to Cart" button
    if (cartData[productId] < 1) {
        delete cartData[productId];
        resetToDefaultButton(productId);
    } else {
        updateGlobalUI(productId);
    }
    
    updateCartBadge();
}

/**
 * Updates the quantity number shown on the card
 */
function updateGlobalUI(productId) {
    let container = document.getElementById('qty-container-' + productId);
    if (container) {
        let qtyDisplay = container.querySelector('.qty-number');
        if (qtyDisplay) {
            qtyDisplay.textContent = cartData[productId];
        }
    }
    updateCartBadge();
}

/**
 * Updates the red cart badge in the header
 */
function updateCartBadge() {
    let totalItems = 0;
    
    // Use a loop to sum up all quantities in cartData
    for (let key in cartData) {
        totalItems = totalItems + cartData[key];
    }
    
    let badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalItems;
        
        // Show badge if items > 0, otherwise hide it
        if (totalItems > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

/**
 * Resets the UI back to the "Add to Cart" button
 */
function resetToDefaultButton(productId) {
    let container = document.getElementById('qty-container-' + productId);
    if (container) {
        // Show "Add to Cart" and hide the +/- buttons
        container.querySelector('.add-to-cart-btn').style.display = 'block';
        container.querySelector('.qty-selector').style.display = 'none';
    }
}