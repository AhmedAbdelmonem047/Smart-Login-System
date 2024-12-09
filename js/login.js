// ----------Routing---------- //
// Remove path name from url
history.pushState({}, "", "/");

// If a user is already logged in, redirect to home page untill the user logs out
if (localStorage.getItem('sessionKey') != null)
    location.replace('/Smart-Login-System/home.html');
// --------------------------- //


// ----------All variables---------- //
const userEmail = document.getElementById('email');
const userPass = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signUpPage = document.getElementById('goTo');
let usersList;
// --------------------------------- //


// ----------Get data from localStorage---------- //
if (localStorage.getItem("usersList")) {
    usersList = JSON.parse(localStorage.getItem("usersList"));
}
else {
    usersList = [];
}
// ---------------------------------------------- //


// ----------Modal box---------- //
function openModalBox(message) {
    Swal.fire({
        title: "Error",
        text: `${message}`,
        icon: "error",
        color: "#fff",
        background: "#24353f",
        confirmButtonColor: "#17a2b8",
    });
}
// ----------------------------- //


// ----------Login function---------- //
function login() {
    let flag = false;
    if (userEmail.value == "" || userPass.value == "") {
        openModalBox('All fields are required');
    }
    else {
        let email = userEmail.value;
        let password = userPass.value;
        if (usersList.length === 0)
            openModalBox('Incorrect email or password');

        for (let i = 0; i < usersList.length; i++) {
            if ((usersList[i].email.toLowerCase() == email.toLowerCase()) && (usersList[i].password.toLowerCase() == password.toLowerCase())) {
                localStorage.setItem('sessionKey', usersList[i].name);
                location.replace('/Smart-Login-System/home.html');
                flag = true;
            }
        }
        if (!flag)
            openModalBox('Incorrect email or password');
    }
}

loginBtn.addEventListener('click', login);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        login();
    }
});
// ---------------------------------- //


// ----------Go to signup page---------- //
signUpPage.addEventListener('click', () => {
    location.replace('/Smart-Login-System/signup.html');
})
// ------------------------------------- //