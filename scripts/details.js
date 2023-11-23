const urlParams = new URLSearchParams(window.location.search)
const product_id = urlParams.get("id")
console.log(product_id)

document.getElementById("username").innerHTML = localStorage.getItem("currentUser") || "Sign in"
if (localStorage.getItem("currentUser") != null)   {
    document.getElementById("logoutIcon").style.display = "block"
} 
let logout = () => {
    localStorage.removeItem("currentUser")
    window.location.href = "../sign_in.html"
}

fetch('https://mas-store.vercel.app/goods/').then(response => response.text()).then(text => {
    let a = eval(text)
    let product = getProductById(product_id)

    document.getElementById("product_name").textContent = product["name"]
    document.getElementById("category").textContent = "Category: " + product["category"]
    document.getElementById("price").textContent = product["price"] + " KZT"
    
    document.getElementById("mainDescription").textContent = product["description"]

    photos = []
    photos.push(product["image_url"])
    photos.push("img/preview.png")
    let gallery = ''
    let dots = ''
    for (let i =0; i < photos.length; i++){
        gallery +=  `<div class="slide">
                        <img src="${photos[i]}" id="photo${i}" class="slideImg">
                        <button onclick="plusSlides(-1)" class="prevBtn border-0">&#10094;</button>
                        <button onclick="plusSlides(1)" class="nextBtn border-0">&#10095;</button>
                        <div class="modal" id="modal${i}">
                            <img src="${photos[i]}" class="modal-cnt">
                        </div>
                    </div>`
        dots += `<span class="dot" onclick="currentSlide(${i})"></span>`
    }
    document.getElementById("gallery").innerHTML = gallery
    document.getElementById("dotsImage").innerHTML = dots
    showSlide(0)

    document.getElementById("main").style.display ="block"
    document.getElementById("loading").style.display ="none"

    photos.forEach((photo, i) => {
        document.getElementById(`photo${i}`).addEventListener("click", function(){
            document.getElementById(`modal${i}`).style.display = "block"
        })
        document.getElementById(`modal${i}`).addEventListener("click", function(){
            document.getElementById(`modal${i}`).style.display = "none"
        })
    })

    function getProductById(id) {
        for (let i =0; i < a.length; i ++){
            if (a[i]["id"] == id){
                return a[i]
            }
        }
        return ;
    }

})

let imgNumber = 0

let cartItems = { length: 0 }; 

let itemsString = localStorage.getItem("cartItems");
if (itemsString != null) {
    cartItems = JSON.parse(itemsString);
}
if (cartItems[product_id]){
    changeProduct(cartItems[product_id])
}


function plusSlides(n){
    imgNumber += n
    showSlide(imgNumber)
}

function currentSlide(n){
    imgNumber = n
    showSlide(imgNumber)
}

function showSlide(n){
    let slides = document.getElementsByClassName("slide")
    let dots = document.getElementsByClassName("dot")


    if (n >= slides.length) {
        imgNumber = 0
    }
    if (n <= -1) {
        imgNumber = slides.length - 1
    }

    for (let i = 0; i < slides.length; i ++){
        slides[i].style["display"] = 'none'
        dots[i].style["background-color"] = "#bbb"
    }

    slides[imgNumber].style["display"] = 'flex'
    dots[imgNumber].style["background-color"] = "black"

}

function addToCart() {
    if (cartItems[product_id]) {
        cartItems[product_id] += 1
    } else {
        cartItems[product_id] = 1
    }
    cartItems.length += 1

    let cart = document.getElementById('cart')
    cart.innerText = `Cart (${cartItems.length})`

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    console.log(localStorage.getItem("cartItems"))
    changeProduct(cartItems[product_id])
}

function changeProduct(n){
    if (n > 0) {
        document.getElementById("productAddMenu").style.display = "flex"
    } else{
        
        document.getElementById("productAddMenu").style.display = "none"
    }
    document.getElementById('productInCart').textContent = n
}

function RemoveFromCart(){

    if (cartItems[product_id] > 1){
        cartItems.length -= 1
        cartItems[product_id] -= 1
    }
    else {
        if (cartItems[product_id] == 1){
            cartItems.length -= 1
        }
        document.getElementById("productAddMenu").style.display = "none"
        delete cartItems[product_id]
    }

    let cart = document.getElementById('cart')
    cart.innerText = `Cart (${cartItems.length})`

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    console.log(localStorage.getItem("cartItems"))
    changeProduct(cartItems[product_id])
}


function showFullText(){
    let btn = document.getElementById("readMoreBtn")
    let addText = document.getElementById("additionalText")
    let dots = document.getElementById("dotsText")

    if (addText.style.display == "inline"){
        btn.innerText = "Read more"
        addText.style.display = "none"
        dots.style.display = "inline"
    } else {
        btn.innerText = "Read less"
        addText.style.display = "inline"
        dots.style.display = "none"
    }
}
