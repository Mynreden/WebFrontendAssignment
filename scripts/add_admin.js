let addForm = document.getElementById("addForm")

addForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let usersArr = JSON.parse(localStorage.getItem("admins")) || [];
    usersArr.push({ "username": username, "password": password})
    console.log(usersArr)

    localStorage.setItem("admins", JSON.stringify(usersArr))

    window.location.replace('/admin.html')
})