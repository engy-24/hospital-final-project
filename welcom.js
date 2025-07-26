function isLoggedIn() {
    return !!localStorage.getItem("userEmail");
}

function applyAuthUI() {
    const isUserLoggedIn = isLoggedIn();

    const guestElements = document.querySelectorAll(".guest-only");
    const authElements = document.querySelectorAll(".auth-only");
    const welcomeUser = document.getElementById("welcomeUser");

    if (isUserLoggedIn) {
        // إظهار قسم المستخدم وتحديث الاسم
        guestElements.forEach(el => el.classList.add("d-none"));
        authElements.forEach(el => el.classList.remove("d-none"));

        const email = localStorage.getItem("userEmail");
        const username = email.split("@")[0];
        if (welcomeUser) {
            welcomeUser.textContent = `Welcome, ${username}`;
        }

    } else {
        // إظهار قسم الزائر
        guestElements.forEach(el => el.classList.remove("d-none"));
        authElements.forEach(el => el.classList.add("d-none"));
    }
}

function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    applyAuthUI();
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", applyAuthUI);
