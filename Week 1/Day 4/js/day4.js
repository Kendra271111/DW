const form = document.getElementById("myForm");
const reset = document.getElementById("resetall");
let expensecard = JSON.parse(localStorage.getItem("expensecard")) || [
    {
        id: 1,
        nama: "TV",
        harga: 1000000
    }
];

function saveToLocalStorage() {
    localStorage.setItem("expensecard", JSON.stringify(expensecard));
}

function renderexpense() {
    const expenseList = document.getElementById("expenselist");
    const totalHargaEl = document.getElementById("totalharga");
    if (!expenseList || !totalHargaEl) return;

    let tableContent = "";
    let total = 0;

    for (let i = 0; i < expensecard.length; i++) {
        const expense = expensecard[i];
        total += expense.harga;
        tableContent += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${expense.nama}</span>
                <span class="text-primary fw-bold">Rp ${expense.harga.toLocaleString()}</span>
            </li>
        `;
    }

    if (!tableContent) {
        tableContent = `<li class="list-group-item text-muted fst-italic">Belum ada pengeluaran.</li>`;
    }

    expenseList.innerHTML = tableContent;
    totalHargaEl.textContent = `Rp ${total.toLocaleString()}`;
}


if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const namabarang = document.getElementById("NamaBarang");
        const price = document.getElementById("Price");
        const errorMessage = document.getElementById("errormessage");
        if (!namabarang.value.trim() || !price.value.trim()) {
            errorMessage.innerHTML = `
                <li class="list-group-item text-white bg-danger">Please fill out all fields</li>
            `;
            return;
        }

        const Newexpense = {
            id: expensecard.length + 1,
            nama: namabarang.value,
            harga: parseInt(price.value, 10) || 0
        };

        expensecard.push(Newexpense);
        namabarang.value = "";
        price.value = "";
        renderexpense();
        saveToLocalStorage();
    });
}

if (reset) {
    reset.addEventListener("click", function(event) {
        event.preventDefault();
        expensecard = [];
        localStorage.clear();
        renderexpense();
    });
    renderexpense();
}

renderexpense();