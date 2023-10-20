let imgNumber = 0
showSlide(imgNumber)
resizeSquare(imgNumber)
let cartItems = 0

$(document).ready(function() {
    $(window).on('resize', function() {
        resizeSquare(imgNumber);
    });

    resizeSquare(imgNumber);
});

function resizeSquare(n) {
    let mainSlide = document.getElementsByClassName("slide")
    mainSlide[n].style["height"] = mainSlide[n].offsetWidth + 'px'
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
    resizeSquare(imgNumber)

}

function addToCart(){
    cartItems += 1
    let cart = document.getElementById('cart')
    if (cartItems == 0){
        cart.innerText = "Cart"
    } else {
        cart.innerText = `Cart (${cartItems})`
    }
}

function showFullText(){
    let btn = document.getElementById("readMoreBtn")
    let addText = document.getElementById("additionalText")
    let dots = document.getElementById('dotsText')

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