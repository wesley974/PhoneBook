// change the url api
const api = "https://wesley974.github.io/phonebook/datas/datas.json";

function init() {
    fetch(api)
        .then(response => response.json())
        .then(data => tableAdd(data));
}

function filterUser(letters) {
    fetch(api)
        .then(response => response.json())
        .then(data => tableAdd(data.filter(item => item.Nom.toLowerCase().includes(letters))));
}

function layoutPhone(n){
  if (n.toString().length === 9) {
    const A = n.toString().slice(0,3);
    const B = n.toString().slice(3,5);
    const C = n.toString().slice(5,7);
    const D = n.toString().slice(7,9);
    return "0" + A + " " + B + " " + C + " " + D;
  } else {
    return n;
  }
}

function sortAlphabetically(property) {
    let sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

function tableAdd(items) {
	tbody = document.querySelector("tbody");
	items.sort(sortAlphabetically("-Name")).forEach(item => {
        tbody.insertAdjacentHTML("afterbegin", `
          <tr>
            <td>${item.Nom}</td>
            <td>${layoutPhone(item.Telephone)}</td>
            <td>${layoutPhone(item.Mobile)}</td>
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
  	filterUser(user.value.toLowerCase());
    user.value = "";
    user.focus();
});

user.focus();
