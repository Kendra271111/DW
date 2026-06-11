const kelasArray = ["Full Stack A", "Full Stack B", "Backend Core"];
const parsedData = JSON.parse(localStorage.getItem("studentdata") || "null");
const studentdata = parsedData && parsedData.length > 0 ? parsedData : [
    {
        id: 1,
        nama: "Budi",
        kelas: kelasArray[0],
        Nilai: 85
    },
    {
        id: 2,
        nama: "Dio",
        kelas: kelasArray[2],
        Nilai: 80
    },
    {
        id: 3,
        nama: "Nortag",
        kelas: kelasArray[1],
        Nilai: 50
    },
    {
        id: 4,
        nama: "Poikol",
        kelas: kelasArray[0],
        Nilai: 10
    },
    {
        id: 5,
        nama: "Betranx",
        kelas: kelasArray[1],
        Nilai: 60
    },
    {
        id: 6,
        nama: "Mibol",
        kelas: kelasArray[1],
        Nilai: 11
    },
    {
        id: 7,
        nama: "Miguel",
        kelas: kelasArray[0],
        Nilai: 67
    },
    {
        id: 8,
        nama: "Paronx",
        kelas: kelasArray[2],
        Nilai: 27
    },
    {
        id: 9,
        nama: "Xenex",
        kelas: kelasArray[0],
        Nilai: 100
    },
    {
        id: 10,
        nama: "Wandi",
        kelas: kelasArray[2],
        Nilai: 99
    },
];
function rendertable(data = studentdata) {
    const tableBody = document.getElementById("tablesiswa");
    tableBody.innerHTML = "";
    data.map((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `  
            <td>${student.id}</td>
            <td>${student.nama}</td>
            <td>${student.kelas}</td>
            <td>${student.Nilai}</td>
        `;
        tableBody.appendChild(row);
    });
}
function searchBar() {
    const searchInput = document.getElementById("SearchByName");
    searchInput.addEventListener('input', (event) => {
        const searchWord = event.target.value.toLowerCase();
        const matchedItems = studentdata.filter((student) => {
            return student.nama.toLowerCase().includes(searchWord);
        });
        rendertable(matchedItems);
    });
}
function calculateAverageScore() {
    const totalScore = studentdata.reduce((acc, student) => acc + student.Nilai, 0);
    const averageScore = totalScore / studentdata.length;
    document.getElementById("averageScore").textContent = averageScore.toFixed(2);
}
window.searchBar = searchBar;
window.rendertable = rendertable;
window.calculateAverageScore = calculateAverageScore;
export {};
//# sourceMappingURL=script.js.map