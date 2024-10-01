document.addEventListener('DOMContentLoaded', function () {
    const VAT_RATE = 0.15;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    

    // Function to add items to cart
    function addToCart(course, price) {
        cart.push({ course, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const course = this.getAttribute('data-course');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(course, price);
        });
    });

    // Function to calculate total price and VAT
    function calculateTotal() {
        let totalAmount = 0;
        cart.forEach(item => totalAmount += item.price);
        const vatAmount = totalAmount * VAT_RATE;
        const finalAmount = totalAmount + vatAmount;
        return { totalAmount, vatAmount, finalAmount };
    }

    // Function to update cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('items');
        cartItemsContainer.innerHTML = ''; // Clear current items

        let { totalAmount, vatAmount, finalAmount } = calculateTotal();

        // Populate cart items
        cart.forEach(item => {
            const itemElement = document.createElement('tr');
            itemElement.innerHTML = `
                <td>${item.course}</td>
                <td>R${item.price.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update totals
        document.getElementById('total-price').textContent = `R${totalAmount.toFixed(2)}`;
        document.getElementById('vat-amount').textContent = `R${vatAmount.toFixed(2)}`;
        document.getElementById('final-amount').textContent = `R${finalAmount.toFixed(2)}`;
    }

    // Update the cart display when page loads
    updateCartDisplay();
});
