const alert = document.querySelector(".alert");
var order;
const menu = {
    Normal_burger: 60,
    Cburger: 70,
    pizza: 300,
    Cpizza: 350,
    pasta: 80,
    noodles: 80,
    dabeli: 40,
    "masala dosa": 90,
    "Aloo tikki": 40,
    samosa: 30,
    momos: 30,
    "chole kulche": 60,
    "paneer tikka": 120,
    "chicken burger": 90,
    "chicken fry pack": 200,
};
function check() {
    order = document.getElementById("item").value;
    if (order !== "None") {
        document.getElementById("quantity").disabled = false;
    }
    update()
}

function update() {
    const num = document.getElementById("quantity").value || 0;
    document.getElementById("cost").value = "Rs. " + menu[order] * parseInt(num);
}

function init_values() {
    const user = JSON.parse(localStorage.getItem("user"));
    // alert(user)
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
}

function returnHome() {
    window.location.href = "home.html";
}

async function placeOrder() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const addr = document.getElementById("addr").value;
    const item = document.getElementById("item").value;
    const quantity = document.getElementById("quantity").value;
    const cost = document.getElementById("cost").value;
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    console.log(`Today's date is ${formattedDate}`);

    try {
        const res = await fetch("https://foody-moody-server.onrender.com/place-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Auth-token": "password",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                addr: addr,
                item: item,
                quantity: quantity,
                date: formattedDate,
                cost: cost,
            }),
        });

        const data = await res.json();
        console.log(data);
        if (data.isSuccess) {
            window.location.href = "home.html";
        } else {
            alert.style.dispaly = "block";
            setTimeout(() => {
                alert.style.display = "none";
            }, 1500);
        }
    } catch (error) {
        alert.style.dispaly = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 1500);
    }
}

init_values();
