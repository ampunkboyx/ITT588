window.addEventListener('DOMContentLoaded', () => {
    const checkoutItems = document.getElementById('checkoutItems');

    const listCards = JSON.parse(localStorage.getItem('listCards'));
    if (listCards && listCards.length > 0) {
        let total = 0;
        listCards.forEach((item) => {
            const { name, color, price, quantity } = item;
            const itemTotal = price * quantity;
            total += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p><strong>${name}${color ? ` - ${color}` : ''}</strong></p>
                <p>Price: ${price.toLocaleString()}</p>
                <p>Quantity: ${quantity}</p>
                <p>Subtotal: ${itemTotal.toLocaleString()}</p>
                <hr>
            `;

            checkoutItems.appendChild(itemDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.innerHTML = `
            <p><strong>Total: ${total.toLocaleString()}</strong></p>
        `;

        checkoutItems.appendChild(totalDiv);
    }
});
