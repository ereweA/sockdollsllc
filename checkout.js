let listCart = []; // initialize cart as an empty array

function checkCart() {
    const cookieValue = document.cookie
        .split('; ') // split cookies 
        .find(row => row.startsWith('listCart=')); // find listcart cookie
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]); // parse cart data from cookie
    }
}

function addCartToHTML() {
    const listCartHTML = document.querySelector('.returnCart .list'); // get cart list element
    listCartHTML.innerHTML = ''; // clear current cart HTML

    const totalQuantityHTML = document.querySelector('.totalQuantity'); // get total quantity element
    const totalPriceHTML = document.querySelector('.totalPrice'); // get total price element

    let totalQuantity = 0;
    let subtotal = 0;

    if (listCart && listCart.length > 0) { // check if cart has items
        listCart.forEach(product => {
            if (product) {
                const newCart = document.createElement('div'); // create a new cart item element
                newCart.classList.add('item'); // add 'item' class to the new element
                newCart.innerHTML = `
                    <img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name} - ${product.desc}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>
                `;
                listCartHTML.appendChild(newCart); // append the new cart item to the list

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
    const baseShipping = typeof window.shippingCost === 'number' ? window.shippingCost : 10; // get base shipping cost
    const expeditedAddon = parseFloat(document.querySelector('input[name="shipping"]:checked')?.value || 0); // get expedited shipping addon
    const fullShipping = baseShipping + expeditedAddon; // calculate total shipping cost

    const subtotal = window.rawProductTotal; // get the subtotal
    const tax = calculateTax(document.getElementById('zip').value, subtotal);  // calculate tax based on zip code
    const total = subtotal + fullShipping + tax;  // calculate total price

    const totalPriceHTML = document.querySelector('.totalPrice'); // get total price element
    totalPriceHTML.innerText = '$' + total.toFixed(2); // display total price

    const shippingPriceHTML = document.querySelector('.shippingPrice'); // get shipping price element
    if (shippingPriceHTML) {
        shippingPriceHTML.innerText = fullShipping.toFixed(2); // display shipping price
    }

    const taxAmountHTML = document.querySelector('.taxAmount'); // get tax amount element
    if (taxAmountHTML) {
        taxAmountHTML.innerText = '$' + tax.toFixed(2); // display tax amount
    }
}

function setupShippingListener() {
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateTotalPrice); // update total price when shipping option changes
    });
}

function autofillProfileData() { // autofill fields based on register data
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        document.getElementById("name").value = userInfo.fullName || '';
        document.getElementById("phone").value = userInfo.phone || '';
        document.getElementById("address").value = userInfo.address || '';
        document.getElementById("zip").value = userInfo.zip || '';
    }
}

function setupZipListener() {
    const zipInput = document.getElementById('zip'); // get zip input field
    if (zipInput) {
        zipInput.addEventListener('input', () => { // listen for zip code input
            setTimeout(() => {
                updateTotalPrice();  // update total price after zip code input
            }, 100); // delay update to allow input processing
        });
    }
}

function calculateTax(zip, subtotal) {
    let taxRate = 0;

    if (/^\d{5}$/.test(zip)) { // check if zip is a valid 5-digit number
        const zipStart = zip.substring(0, 2); // get the first 2 digits of the zip code
        
        switch (zipStart) { // determine tax rate based on placeholder regions
            case '01': case '02': case '03': case '04': 
                taxRate = 0.05; break;  
            case '05': case '06': case '07': case '08': 
                taxRate = 0.07; break;  
            case '09': case '10': 
                taxRate = 0.08; break;  
            default:
                taxRate = 0.06; // default tax rate
        }
    }
    return subtotal * taxRate; // calculate tax based on subtotal
}

function showOrderSummary() {
    const name = document.getElementById("name").value || "Customer"; // get field values
    const address = document.getElementById("address").value || "your address";
    const total = document.querySelector(".totalPrice")?.innerText || "$0.00";

    alert(`${name}, your products will be delivered to ${address}. Total cost: ${total}`);

    setTimeout(() => {
        window.location.href = "index.html"; // redirect to index page after 1 second
    }, 1000);

    listCart = []; // reset cart array
    document.cookie = "listCart=[]; path=/; max-age=0"; // clear listCart cookie

    addCartToHTML();
}

checkCart();
addCartToHTML();
setupShippingListener();
autofillProfileData();
setupZipListener();