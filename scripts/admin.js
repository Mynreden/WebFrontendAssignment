
if (localStorage.getItem('admin') == "false") {
    window.location.href = "../sign_in.html"
}

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


        let usersArr = JSON.parse(localStorage.getItem("admins")) || [];
        const admins = document.getElementById('admins')
        usersArr.forEach(user => {
                        var row = admins.insertRow(1)
                        var username = row.insertCell(0)
                        username.innerHTML = user.username
                        var password = row.insertCell(1)
                        password.innerHTML = user.password
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