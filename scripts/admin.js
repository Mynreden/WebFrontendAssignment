document.addEventListener("DOMContentLoaded", function () {
    fetch('https://mas-store.vercel.app/GOODS/')
        .then(response => response.json())
        .then(data => {
            const products = document.getElementById('products')
            data.forEach(prod => {
                var row = products.insertRow(1)
                var id = row.insertCell(0)
                id.innerHTML = prod.id
                var name = row.insertCell(1)
                name.innerHTML = prod.name
                var description = row.insertCell(2)
                description.innerHTML = prod.description
                var image = row.insertCell(3)
                image.innerHTML = prod.image_url
                var price = row.insertCell(4)
                price.innerHTML = prod.price
                var category = row.insertCell(5)
                category.innerHTML = prod.category
                var deleteButton = row.insertCell(6)
                deleteButton.innerHTML = `<button onclick="deleteProduct(${prod.id})" class="btn btn-danger">Delete</button>`
            })
        })
})

function deleteProduct(id) {
    fetch(`https://mas-store.vercel.app/goods/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    })
    window.location.replace('/admin.html')
}