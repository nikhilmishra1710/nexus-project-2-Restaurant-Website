const menu_link = document.querySelectorAll(".menu_redirect");
const login_check = document.querySelector(".alert");
const user = JSON.parse(localStorage.getItem("user"));
const auth_btn = document.querySelector(".login");
const username = document.querySelector(".username");
// console.log(user.username)
function checkUser() {
    menu_link.forEach((ele) => {
        if (user) {
            ele.href = "menu.html";
        } else {
            ele.removeAttribute("href");
            ele.style.cursor = "not-allowed";
            ele.classList.toggle("menu_block");
            ele.addEventListener("mouseover", () => {
                login_check.style.display = "block";
            });
            ele.addEventListener("mouseout", () => {
                login_check.style.display = "none";
            });
        }
    });

    if (user) {
        auth_btn.innerHTML = "Logout";
        auth_btn.removeAttribute("href");
        auth_btn.addEventListener("mousedown", () => {
            logout();
        });
    } else {
        auth_btn.innerHTML = "Login";
        auth_btn.href = "login.html";
    }

    if (user) {
        username.innerHTML = user.username;
    } else {
        username.innerHTML = "user";
    }
}

async function validateUser() {
    if (user) {
        try {
            const res = await fetch("http://localhost:3000/validate-user-token", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Auth-token": "password",
                },
                body: JSON.stringify({
                    token: user.token,
                }),
            });

            const data = await res.json();

            if (data.isSuccess === false) {
                localStorage.removeItem("user");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.reload();
}

window.onload = () => {
    validateUser();
    checkUser();
};
