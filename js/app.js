const api = "http://url_to_your_datas_in.json"; // change me

function init() {
    fetch(api)
        .then(response => response.json())
        .then(data => tableAdd(data));
}

function filterUser(letters) {
    fetch(api)
        .then(response => response.json())
        .then(data => tableAdd(data.filter(t => t.Nom.toLowerCase().includes(letters))));
}

function tableAdd(items) {
	tbody = document.querySelector("tbody");
	items.forEach(item => {
        tbody.insertAdjacentHTML("afterbegin", `
          <tr>
            <td>${item.Nom}</td>
            <td>${item.Telephone}</td>
            <td>${item.Mobile}</td>
            <td>${item.Email}</td>
          </tr>
        `);
	 });
}

function cleanTable() {
	tbody = document.querySelector("tbody");
	tbody.innerHTML = '';
}

init();

const form = document.querySelector("form");
const user = document.querySelector("#filter");
form.addEventListener("submit", event => {
  	event.preventDefault();
    cleanTable();
  	filterUser(user.value);
    user.value = "";
    user.focus();
});

user.focus();
