let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'PAINT SERVICE',
        image: 'airbrush.PNG',
        price: 120000,
        colors: ['Red', 'Blue', 'Green', 'Orange', 'Yellow', 'Purple', 'Brown', 'Black']
    },
    {
        id: 2,
        name: 'AIRCOND SERVICE',
        image: 'aircond.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'BATTERY REPLACEMENT',
        image: 'battery.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'CAR DIAGNOSTIC',
        image: 'diagnostic.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'CHANGE OIL & FILTER',
        image: 'engine-oil.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'TIRE INSTALLATION',
        image: 'spare-tire.PNG',
        price: 120000
    }
];
let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="item-content">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                <button class="add-to-cart-button" onclick="addToCard(${key})">Add To Cart</button>
            </div>`;
        if (value.colors) {
            newDiv.innerHTML += `
                <div class="color-container">
                    <select class="color-dropdown" onchange="changeColor(${key}, this.value)">
                        ${generateColorOptions(value.colors)}
                    </select>
                    <div class="color-preview"></div>
                </div>`;
        }
        list.appendChild(newDiv);

        if (value.colors) {
            let dropdown = newDiv.querySelector('.color-dropdown');
            dropdown.value = 'Black';
        }
    });
}

function generateColorOptions(colors) {
    let options = '';
    colors.forEach((color) => {
        options += `<option value="${color}">${color}</option>`;
    });
    return options;
}

function changeColor(key, color) {
    listCards[key].color = color;
    let itemCard = listCard.children[key];
    let colorPreview = itemCard.querySelector('.color-preview');
    colorPreview.style.backgroundColor = color;
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        if (listCards[key].colors) {
            listCards[key].color = document.querySelector(`.item:nth-child(${key + 1}) .color-dropdown`).value;
        }
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}${value.color ? ` - ${value.color}` : ''}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
            let colorPreview = newDiv.querySelector('.color-preview');
            if (value.color) {
                colorPreview.style.backgroundColor = value.color;
            }
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function redirectToCheckout() {
    window.location.href = "checkout.html";
}
