let loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", (e) => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    if (checkUsername(username) && checkPassword(password)){
        alert(`Succcesful login\nUsername: ${username} \nPassword: ${password}`)
    }
})

let checkPassword = password => {
    const numberPattern = /\d+/;
    const upperCasePattern = /[A-Z]/;

    if (password.length < 8){
        alert('Password too short. Use password more than 7 symbols')
        return false
    } 
    if (!numberPattern.test(password)) {
        alert("Use one or more digits in password")
        return false
    }
    if (!upperCasePattern.test(password)) {
        alert("Use one or more upper case symbols in password")
        return false
    }
    return true;
}

let checkUsername = username => {
    const numberPattern = /\d+/;
    const upperCasePattern = /[A-Z]/;

    if (username.length < 8){
        alert('Username too short. Use username more than 7 symbols')
        return false
    } 
    if (!numberPattern.test(username)) {
        alert("Use one or more digits in username")
        return false
    }
    if (!upperCasePattern.test(username)) {
        alert("Use one or more upper case symbols in username")
        return false
    }
    return true;
}
