fetch('https://mas-store.vercel.app/GOODS/')
    .then(response => response.json())
    .then(data => data.forEach(prod => {
        const womenProdsContainer = document.getElementById('womenProds');
        const menProdsContainer = document.getElementById('menProds');
        const kidsProdsContainer = document.getElementById('kidsProds');

        const productCard = document.createElement('div');
        productCard.className = 'col-lg-3 col-sm-6 col-12 text-center';
        productCard.innerHTML = `
                <a href="details.html"><img src="${prod.image_url}" class="img-fluid my-2"></a>
                <a href="details.html" class="text-decoration-none link-dark">${prod.name}</a>
                <p class="my-2">${prod.price} KZT</p>
                <div class="d-grid col-lg-8 mx-auto">
                    <button type="button" class="btn btn-outline-dark my-1">Add to cart</button>
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
    }))