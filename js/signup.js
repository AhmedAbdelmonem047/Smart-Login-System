// ----------Routing---------- //
// Remove path name from url
// history.pushState({}, "", "/");

// If a user is already logged in, redirect to home page untill the user logs out
if (localStorage.getItem('sessionKey') != null)
    location.replace('/Smart-Login-System/home.html');
// --------------------------- //


// ----------All variables---------- //
const userName = document.getElementById('userName');
const userEmail = document.getElementById('email');
const userPass = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const signInPage = document.getElementById('goTo');
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
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


// ----------Validation function---------- //
function validate(input, regex) {
    var flag = false;
    if (regex.test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        flag = true;
    }
    else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
    return flag;
}

userEmail.addEventListener('input', () => {
    validate(userEmail, emailRegex);
    if (userEmail.value === '')
        userEmail.classList.remove('is-invalid');
})
userPass.addEventListener('input', () => {
    validate(userPass, passRegex);
    if (userPass.value === '')
        userPass.classList.remove('is-invalid');
})
// --------------------------------------- //

// ----------Modal box---------- //
function openModalBox(title, icon, message, rules = false) {
    if (icon == 'success') {
        Swal.fire({
            title: `${title}`,
            text: `${message}`,
            icon: `${icon}`,
            color: "#fff",
            background: "#24353f",
            confirmButtonColor: "#17a2b8",
        }).then((result) => {
            if (result.isConfirmed) {
                location.replace('/Smart-Login-System/login.html');
            }
        });
    } else if (rules) {
        Swal.fire({
            icon: "error",
            title: "Error",
            color: "#fff",
            background: "#24353f",
            confirmButtonColor: "#17a2b8",
            html: `
            <h3 class="py-1">Something went wrong!</h3>
            <span>Rules:</span>
            <ul class="list-unstyled ">
                <li>
                     <p>Email must be valid ex.(example@domain.com)</p>
                </li>
                <li>
                    <p>Password must be at least eight characters long, one upper case letter, one lower case letter, one number and one special character</p>
                </li>
            </ul>
          `,
        });
    } else {
        Swal.fire({
            title: `${title}`,
            text: `${message}`,
            icon: `${icon}`,
            color: "#fff",
            background: "#24353f",
            confirmButtonColor: "#17a2b8",
        });
    }
}
// ----------------------------- //


// ----------SignUp function---------- //
function signUp() {
    let duplicateFlag = false;
    if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
        openModalBox('Error', 'error', 'All fields are required');
    }
    else {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].email.toLowerCase() == userEmail.value.toLowerCase()) {
                openModalBox('Error', 'error', 'Email already exists');
                userEmail.value = ""
                duplicateFlag = true;
                break;
            }
        }
        if (!duplicateFlag) {
            if (validate(userEmail, emailRegex) && validate(userPass, passRegex)) {
                let user = {
                    name: userName.value,
                    email: userEmail.value,
                    password: userPass.value,
                }
                usersList.push(user);
                localStorage.setItem('usersList', JSON.stringify(usersList))
                openModalBox('Success', 'success', 'User created successfully')
            }
            else {
                openModalBox('Error', 'error', '', true);
            }
        }
    }
}

signUpBtn.addEventListener('click', signUp);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        signUp();
    }
});
// ---------------------------------- //


// ----------Go to login page---------- //
signInPage.addEventListener('click', () => {
    location.replace('/Smart-Login-System/login.html');
})
// ------------------------------------- //