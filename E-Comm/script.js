const createBtn = document.querySelector('#create');
const formDiv = document.querySelector('.form');
const cross = document.querySelector('#close'); 
const form = document.querySelector('form');
const products = document.querySelector('.products');
let updateIndex = null;
const productsArr = JSON.parse(localStorage.getItem("products")) || [];

let ui = () => {
    products.innerHTML = "";
    productsArr.forEach((ele, idx) => {
        products.innerHTML += `<div class="product-card">
                <div class="img">
                    <img src="${ele.image}">
                </div>

                <div class="text">
                    <h3>${ele.productName}</h3>
                    <p>${ele.description}</p>
                    <p>${ele.price}</p>
                    </div>

                    <div class="btns">
                    <button onclick="updateProduct('${ele.productName}')" id="update">Update</button>
                    <button onclick="deleteProduct('${idx}')" id="delete">Delete</button>
                    </div>
                    </div>`
                });
}

createBtn.addEventListener('click', () => {
    formDiv.style.display = "flex";
});

cross.addEventListener('click', () => {
    formDiv.style.display = "none";
});

form.addEventListener('submit', (events) => {
    events.preventDefault();
    let productName = form[0].value;
    let description = form[1].value;
    let price = form[2].value;
    let image = form[3].value;
    
    if(productName.trim() === "" ||
    description.trim() === "" || 
    price === "" || 
    image.trim() === "") {
        alert("Please fill all the required fields!");
        return;
    }
    
    let obj = {
        productName,
        description,
        price,
        image
    };
    
    if(updateIndex != null) {
        productsArr[updateIndex] = obj;
        updateIndex = null;
        localStorage.setItem('products', JSON.stringify(productsArr));
    } else {
        productsArr.push(obj);
        localStorage.setItem('products', JSON.stringify(productsArr));
    }
    
    ui();
    formDiv.style.display = "none";
    form.reset();
});

const updateProduct = (name) => {
    let product = productsArr.find((ele) => ele.productName === name);
    updateIndex = productsArr.findIndex((ele) => ele.productName === name);
    form[0].value = product.productName;
    form[1].value = product.description;
    form[2].value = product.price;
    form[3].value = product.image;
    formDiv.style.display = "flex";
};

const deleteProduct = (id) => {
    productsArr.splice(id, 1);
    localStorage.setItem('products', JSON.stringify(productsArr));
    ui();
};

ui();