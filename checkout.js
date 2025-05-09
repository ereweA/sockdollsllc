let listCart = [];

function checkCart() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

function addCartToHTML() {
    const listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    const totalQuantityHTML = document.querySelector('.totalQuantity');
    const totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let subtotal = 0;

    if (listCart && listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                const newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                    <img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name} - ${product.desc}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>
                `;
                listCartHTML.appendChild(newCart);

                totalQuantity += product.quantity;
                subtotal += product.price * product.quantity;
            }
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    window.rawProductTotal = subtotal;
    updateTotalPrice();
}

function updateTotalPrice() {
    const baseShipping = typeof window.shippingCost === 'number' ? window.shippingCost : 10;
    const expeditedAddon = parseFloat(document.querySelector('input[name="shipping"]:checked')?.value || 0);
    const fullShipping = baseShipping + expeditedAddon;

    const subtotal = window.rawProductTotal;
    const tax = calculateTax(document.getElementById('zip').value, subtotal); 
    const total = subtotal + fullShipping + tax; 

    const totalPriceHTML = document.querySelector('.totalPrice');
    totalPriceHTML.innerText = '$' + total.toFixed(2);

    const shippingPriceHTML = document.querySelector('.shippingPrice');
    if (shippingPriceHTML) {
        shippingPriceHTML.innerText = fullShipping.toFixed(2);
    }

    const taxAmountHTML = document.querySelector('.taxAmount');
    if (taxAmountHTML) {
        taxAmountHTML.innerText = '$' + tax.toFixed(2);
    }
}

function setupShippingListener() {
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateTotalPrice);
    });
}

function autofillProfileData() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        document.getElementById("name").value = userInfo.fullName || '';
        document.getElementById("phone").value = userInfo.phone || '';
        document.getElementById("address").value = userInfo.address || '';
        document.getElementById("zip").value = userInfo.zip || '';
    }
}

function setupZipListener() {
    const zipInput = document.getElementById('zip');
    if (zipInput) {
        zipInput.addEventListener('input', () => {
            setTimeout(() => {
                updateTotalPrice(); 
            }, 100);
        });
    }
}

function calculateTax(zip, subtotal) {
    let taxRate = 0;

    if (/^\d{5}$/.test(zip)) {
        const zipStart = zip.substring(0, 2); 
        
        switch (zipStart) {
            case '01': case '02': case '03': case '04': 
                taxRate = 0.05; break;  
            case '05': case '06': case '07': case '08': 
                taxRate = 0.07; break;  
            case '09': case '10': 
                taxRate = 0.08; break;  
            default:
                taxRate = 0.06; 
        }
    }
    return subtotal * taxRate;
}


checkCart();
addCartToHTML();
setupShippingListener();
autofillProfileData();
setupZipListener();