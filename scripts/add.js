let addForm = document.getElementById("addForm")

document.getElementById("username").innerHTML = localStorage.getItem("currentUser") || "Sign in"
if (localStorage.getItem("currentUser") != null)   {
    document.getElementById("logoutIcon").style.display = "block"
} 
let logout = () => {
    localStorage.removeItem("currentUser")
    window.location.href = "../sign_in.html"
}

addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let name = document.getElementById("name").value
    let description = document.getElementById("description").value
    let price = document.getElementById("price").value
    let category = document.getElementById("category").value
    let image_url = document.getElementById("image_url").value

    let formData = {}
    formData.name = name
    formData.description = description
    formData.image_url = image_url
    formData.price = price
    formData.category = category
    console.log(formData)

    await fetch(`https://mas-store.vercel.app/goods/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    window.location.replace('/admin.html')
})