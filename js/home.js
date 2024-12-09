// Remove path name from url
// history.pushState({}, "", "/");

// ----------All variables---------- //
const logOutBtn = document.getElementById('logOutBtn');
const userNameTag = document.getElementById('userNameTag');
const sessionKey = localStorage.getItem('sessionKey');
// --------------------------------- //


// ----------Redirect user if home url is entered manually---------- //
if (sessionKey == null)
    location.replace('/Smart-Login-System/login.html');
// ----------------------------------------------------------------- //


// ----------Display username---------- //
userNameTag.innerHTML = "Welcome " + sessionKey;
// ------------------------------------ //


// ----------LogOut function---------- //
function logOut() {
    localStorage.removeItem('sessionKey');
    location.replace('/Smart-Login-System/login.html');
}

logOutBtn.addEventListener('click', logOut);
// ----------------------------------- //