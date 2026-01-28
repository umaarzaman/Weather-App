const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

function render() {
    list.innerHTML = "";
    total = 0;

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.title}
            <span>$${expense.amount}</span>
            <button class="delete">X</button>
        `;

        li.querySelector(".delete").addEventListener("click", () => {
            expenses.splice(index, 1);
            save();
        });

        list.appendChild(li);
        total += expense.amount;
    });

    totalEl.textContent = total;
}

function save() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    render();
}

addBtn.addEventListener("click", () => {
    const title = titleInput.value;
    const amount = Number(amountInput.value);

    if(title === "" || amount === 0){
        alert("Fill both fields");
        return;
    }

    expenses.push({ title, amount });
    save();

    titleInput.value = "";
    amountInput.value = "";
});

render();
titleInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

amountInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});
