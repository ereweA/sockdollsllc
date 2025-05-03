let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', ()=>{
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right == '-100%';
        container.style.transform = 'translateX(0)';
    }  
})
close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})

let products = null;
// get data from json file
fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

// show data in list in html
function addDataToHTML(){
    // remove default html data
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // add new data
    if(products != null){
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
            '<img src="${product.image}" alt=""> <h2>${product.name}</h2> <div class="${product.price}">$50</div> <button onclick="addCart(${product.id})">Add to Cart</button> '
            listProductHTML.appendChild(newProduct);
        });
    }
}