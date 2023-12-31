let loginForm = document.getElementById("loginForm")
let canLogin1 = false
let canLogin2 = false

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let username = document.getElementById("usernameIn").value
    let password = document.getElementById("passwordIn").value

    let usersArr = JSON.parse(localStorage.getItem("users")) || [];
    console.log(usersArr) 

    let adminsArr = JSON.parse(localStorage.getItem("admins")) || [];  
    for (let i = 0; i < adminsArr.length; i++) {
        if (adminsArr[i].username === username && adminsArr[i].password === password) {
            localStorage.setItem("admin", "true")
            window.location.href = "../admin.html"
            return
        }
    }
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].username === username && usersArr[i].password === password) {
            login(username)
            localStorage.setItem("admin", "false")
            window.location.href = "../index.html"
            return
        }
    }
    alert("Wrong username or password")
})

let signUpForm = document.getElementById("signUpForm")

signUpForm.addEventListener("submit", (e) => { 
    e.preventDefault()
    if (canLogin1 == false || canLogin2 == false){
        return
    }
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value

    let usersArr = JSON.parse(localStorage.getItem("users")) || [];
    usersArr.push({ "username": username, "password": password, "email": email, "phone": phone})
    console.log(usersArr)

    localStorage.setItem("users", JSON.stringify(usersArr))
    // Assuming you have a login function defined elsewhere in your code
    login(username)
    window.location.href = "../index.html"
})

let login = (username) => {
    localStorage.setItem("currentUser", username)
}

function toogle() {
    sign_in = document.getElementById("sign_in")
    sign_up = document.getElementById("sign_up")

    if (sign_in.style.display === "none") {
        sign_in.style.display = "flex";
        sign_up.style.display = "none";
    } else {
        sign_in.style.display = "none";
        sign_up.style.display = "flex";
    }
    
}

function checkUsername() {
    username = document.getElementById("username").value
    checker = document.getElementById("usernameChecker")
    if (username.length < 5) {
        checker.innerHTML = "Username must be at least 5 characters long"
        return
    }
    else {
        checker.innerHTML = ""
        canLogin1 = true
    }
}

function checkPassword() {
    password = document.getElementById("password").value
    checker = document.getElementById("passwordChecker")
    if (password.length < 8) {
        checker.innerHTML = "Password must be at least 8 characters long"
        return
    }
    else if (!containInt(password)) {
        checker.innerHTML = "Password must contain at least one number"
        return
    }
    else {
        checker.innerHTML = ""
        canLogin2 = true
    }
}

let containInt = (str) => {
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            return true
        }
    }
    return false
}
