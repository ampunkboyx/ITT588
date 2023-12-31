window.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('deuteranopia-toggle');
    const toggleLabel = document.querySelector('label[for="deuteranopia-toggle"]');
    const body = document.body;

    toggle.addEventListener('change', function() {
    if (toggle.checked) {
        body.classList.add('deuteranopia-filter');
        localStorage.setItem('deuteranopia', 'enabled');
        toggleLabel.textContent = 'Disable Deuteranopia Filter';
    } else {
        body.classList.remove('deuteranopia-filter');
        localStorage.setItem('deuteranopia', 'disabled');
        toggleLabel.textContent = 'Enable Deuteranopia Filter';
    }
    });

    // Check the local storage and set the Deuteranopia filter accordingly
    const deuteranopiaSetting = localStorage.getItem('deuteranopia');
    if (deuteranopiaSetting === 'enabled') {
    toggle.checked = true;
    body.classList.add('deuteranopia-filter');
    toggleLabel.textContent = 'Disable Deuteranopia Filter';
    } else {
    toggle.checked = false;
    body.classList.remove('deuteranopia-filter');
    toggleLabel.textContent = 'Enable Deuteranopia Filter';
    }

    // Clear the local storage when navigating back to index.html from other pages
    if (window.performance && window.performance.navigation.type === 2) {
    localStorage.removeItem('deuteranopia');
    }
});
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PAINT SERVICE',
        image: 'car-paint-service.jpg',
        price: 1000,
        colors: ['Red', 'Blue', 'Green', 'Orange', 'Yellow', 'Purple', 'Brown', 'Black']
    },
    {
        id: 2,
        name: 'AIRCOND SERVICE',
        image: 'car-aircond-service.jpg',
        price: 180
    },
    {
        id: 3,
        name: 'BATTERY REPLACEMENT',
        image: 'car-battery-service.jpg',
        price: 300
    },
    {
        id: 4,
        name: 'CAR DIAGNOSTIC',
        image: 'car-diagnostic-service.jpeg',
        price: 250
    },
    {
        id: 5,
        name: 'CHANGE OIL & FILTER',
        image: 'car-engine-oil-service.jpg',
        price: 50
    },
    {
        id: 6,
        name: 'TIRE INSTALLATION',
        image: 'car-spare-tire-service.jpg',
        price: 2000
    }
];
let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="assets/images/${value.image}">
            <div class="item-content">
                <div class="title">${value.name}</div>
                <div class="price">RM ${value.price.toLocaleString()}</div>
                <div class="price">${value.id === 1 ? generateColorDropdown(key) : ''}</div>
                ${value.id !== 1 ? '<br>' : ''}
                <button class="button" onclick="addToCard(${key})" >Add To Cart</button> 
            </div>`;
        list.appendChild(newDiv);
    });
}

function generateColorDropdown(key) {
    let dropdownOptions = '';
    if (products[key].colors && products[key].colors.length > 0) {
        products[key].colors.forEach((color) => {
            dropdownOptions += `<option value="${color}" style="color: ${color.toLowerCase()}">${color}</option>`;
        });
        return `
            <div class="color-container">
                <select class="color-dropdown" onchange="changeColor(${key}, this.value)">
                    ${dropdownOptions}
                </select>
                <div class="color-preview"></div>
            </div>`;
    }
    return '';
}

function changeColor(key, color) {
    listCards[key].color = color;
    
    // Update the image based on the selected color
    let imageElement = document.querySelector(`.item:nth-child(${key + 1}) img`);
    if (imageElement) {
        let imageName = products[key].image;
        let colorImageName = imageName.replace('.PNG', `_${color.toLowerCase()}.PNG`);
        imageElement.src = `image/${colorImageName}`;
    }
    
    // Update the color preview
    let colorPreview = document.querySelector(`.item:nth-child(${key + 1}) .color-preview`);
    if (colorPreview) {
        colorPreview.style.backgroundColor = color;
    }
    
    // Update the cart if the product is already in the cart
    reloadCard();
}


initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // Copy product from list to list card
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
                <div>${value.name}${value.color ? ` - ${value.color}` : ''}</div>
                <div>RM ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = `RM ${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}


function changeColor(key, color) {
    listCards[key].color = color;

    // Update the cart if the product is already in the cart
    reloadCard();
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
