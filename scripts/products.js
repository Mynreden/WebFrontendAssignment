document.getElementById("username").innerHTML = localStorage.getItem("currentUser") || "Sign in"
if (localStorage.getItem("currentUser") != null)   {
    document.getElementById("logoutIcon").style.display = "block"
} 
let logout = () => {
    localStorage.removeItem("currentUser")
    window.location.href = "../sign_in.html"
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://mas-store.vercel.app/GOODS/')
        .then(response => response.json())
        .then(data => {
            const womenProdsContainer = document.getElementById('womenProds');
            const menProdsContainer = document.getElementById('menProds');
            const kidsProdsContainer = document.getElementById('kidsProds');

            data.forEach(prod => {
                const productCard = document.createElement('div');
                productCard.className = 'product col-lg-3 col-sm-6 col-12 text-center';
                productCard.dataset.price = prod.price;
                productCard.innerHTML = `
            <a href="details.html?id=${prod.id}"><img src="${prod.image_url}" class="img-fluid my-2"></a>
            <a href="details.html?id=${prod.id}" class="text-decoration-none link-dark">${prod.name}</a>
            <p class="my-2">${prod.price} KZT</p>
            <div class="d-grid col-lg-8 mx-auto">
                <button type="button" class="cart btn btn-outline-dark my-1" data-id="${prod.id}"
                data-bs-toggle="modal" data-bs-target="#cartModal">Add to cart</button>
            </div>
        `;
                if (prod.category == 'women') {
                    womenProdsContainer.appendChild(productCard)
                }
                else if (prod.category == 'men') {
                    menProdsContainer.appendChild(productCard)
                }
                else if (prod.category == 'kids') {
                    kidsProdsContainer.appendChild(productCard)
                }
            })

            let products = document.querySelectorAll(".product")
            let apply = document.querySelector('#apply')
            let reset = document.querySelector('#reset')

            reset.addEventListener("click", function () {
                show(products)

                show(document.querySelectorAll("#women, #men, #kids"));

            })

            apply.addEventListener("click", function () {
                show(products)

                hide(document.querySelectorAll("#women, #men, #kids"));

                show(document.querySelectorAll(categoryFilter.join(', ')));

                hideByPrice()

            })

            function hideByPrice() {
                let min = document.getElementById('min').value;
                let max = document.getElementById('max').value;
                products.forEach(function (product) {
                    let pp = product.dataset.price
                    if (pp < min || pp > max) {
                        product.style.display = "none"
                    }
                })
            }

            let cart = document.querySelectorAll(".cart");
            console.log(cart)

            cart.forEach(function (cart) {
                cart.addEventListener('click', function () {
                    console.log(cart.dataset.id)
                    addToCart(cart.dataset.id)
                });
            });
        })

    let cartItems = { length: 0 };

    let itemsString = localStorage.getItem("cartItems");
    if (itemsString != null) {
        cartItems = JSON.parse(itemsString);
    }

    function addToCart(id) {
        if (cartItems[id]) {
            cartItems[id] += 1
        } else {
            cartItems[id] = 1
        }
        cartItems.length += 1

        let cart = document.getElementById('cart')
        cart.innerText = `Cart (${cartItems.length})`

        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        console.log(localStorage.getItem("cartItems"))
    }


    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    let categoryFilter = [];

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            categoryFilter = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => "#" + i.value);
        });
    });

    function hide(elements) {
        elements.forEach(function (element) {
            element.style.display = "none";
        });
    }

    function show(elements) {
        elements.forEach(function (element) {
            element.style.display = "block";
        });
    }

});
