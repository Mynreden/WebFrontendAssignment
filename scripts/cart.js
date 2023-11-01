let cartItems = JSON.parse(localStorage.getItem("cartItems"))
if (cartItems != null){
    if (cartItems.length == 0){
        console.log("Nothing in the cart")
    } 
} else{
    cartItems = {"length": 0}
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

let finalItems = {}

const arr = []
fetch('https://mas-store.vercel.app/goods/').then(response => response.text()).then(text => {

    let allProducts = eval(text)
    let keys = Object.keys(cartItems)
    for (let i = 0; i < keys.length; i ++){
        for (let j = 0; j < allProducts.length; j++){
            if (keys[i] == allProducts[j].id){
                arr.push({"product": allProducts[j], "count": cartItems[keys[i]]})
            }
        }
    }
    renderItems(arr)

    arr.forEach(item => {
        finalItems[item.product.id] = item.count
        changeTotalSum(finalItems)

        document.getElementById(`checkbox${item.product.id}`).addEventListener('change', function(){
            if (this.checked){
                let a = document.getElementById(`productInCart${item.product.id}`).textContent
                if (a == 0){
                    delete finalItems[item.product.id]}
                else{
                    finalItems[item.product.id] = a 
                }
            } else{
                delete finalItems[item.product.id]
            }
            changeTotalSum(finalItems)
            console.log(finalItems)
        })
    })
})

function renderItems(arr){
    let text = ''
    for (let i = 0; i < arr.length; i ++){
        text += renderItem(arr[i])
    }
    document.getElementById("fullCart").innerHTML = text
}



function renderItem(item){
    
    return `<div class="container-fluid d-flex w-50 justify-content-between border-2 border-top border-start p-3">
                <div class="col-3">
                    <a href="details.html?id=${item.product.id}">
                    <img src="${item.product.image_url}" class="w-100">
                    </a>
                </div>
                <div class="col-6 d-flex flex-column justify-content-evenly">
                    <a href="details.html?id=${item.product.id}" class="text-decoration-none text-dark">
                    
                        <h4>${item.product.name}</h4>
                        <h5>${item.product.price} KZT</h5>
                        <h6 id="amount${item.product.id}">Amount: ${item.count}</h6>
                        <p>${item.product.description.slice(0, 50)}...</p>
                    </a>
                    <div class="mt-3 d-flex w-50 flex-row justify-content-center align-items-start">
                        <button class="btn btn-outline-secondary" onclick="addToCart(${item.product.id})">+</button>
                        <h5 id="productInCart${item.product.id}" class="ms-3 me-3">${item.count}</h5>
                        <button class="btn btn-outline-secondary" onclick="RemoveFromCart(${item.product.id})">-</button>
                    </div>
                </div>
                <div class="col-1 d-flex flex-column justify-content-center">
                    <input type="checkbox" class="me-2" style="width: 20px; height: 30px;" name="" id="checkbox${item.product.id}" checked autocomplete="on">
                </div>
            </div>`
}


function addToCart(product_id) {
    if (cartItems[product_id]) {
        cartItems[product_id] += 1
    } else {
        cartItems[product_id] = 1
    }
    cartItems.length += 1
    finalItems[product_id] = cartItems[product_id]
    changeTotalSum(finalItems)

    changeAmount(cartItems, product_id)

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    console.log(localStorage.getItem("cartItems"))
    console.log(finalItems)


    let productInCart = document.getElementById(`productInCart${product_id}`)
    productInCart.textContent = cartItems[product_id]
}

function RemoveFromCart(product_id){

    if (cartItems[product_id] > 1){
        cartItems.length -= 1
        cartItems[product_id] -= 1
        
        finalItems[product_id] = cartItems[product_id]
    } else if (cartItems[product_id] == 1){
            cartItems.length -= 1
            delete cartItems[product_id]
            delete finalItems[product_id]
    }
    changeTotalSum(finalItems)

    changeAmount(cartItems, product_id)

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    console.log(localStorage.getItem("cartItems"))
    console.log(finalItems)

    let productInCart = document.getElementById(`productInCart${product_id}`)
    productInCart.textContent = cartItems[product_id]  != null ? cartItems[product_id] : 0
}

function changeAmount(cartItems, product_id){
    let cart = document.getElementById('cart')
    cart.innerText = `Cart (${cartItems.length})`
    let productAmount = document.getElementById(`amount${product_id}`)
    productAmount.innerText = `Amount: ${cartItems[product_id] == null ? 0 : cartItems[product_id]}`
}


function changeTotalSum(items){
    let a = "Total: " + (items == {} ? 0 : Object.keys(items).reduce((sum, key) => sum + items[key] * arr.find(item => item.product.id == key).product.price, 0))
    document.getElementById("totalPrice").innerHTML = 
    `<div class="container-fluid mt-5 d-flex fs-5 justify-content-center">
        <h3>${a}</h5>
    </div>`
}