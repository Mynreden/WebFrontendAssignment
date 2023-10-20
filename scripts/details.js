let imgNumber = 0
showSlide(imgNumber)

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
        slides[i].style.display = "none"
    }

    slides[imgNumber].style.display = "block"
}