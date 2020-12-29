// change the url api
const api = "https://wesley974.github.io/phonebook/datas/datas.json";

const init = async () => {
    const response = await fetch(api);
    return await response.json()
}

const filterUser = (letters) => {
    init().then (data => tableAdd(data.filter(t => t.Nom.toLowerCase().includes(letters))));
}

const layoutPhone = (n) => {
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

const sortAlphabetically = (property) => {
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

const tableAdd = (items) => {
	tbody = document.querySelector("tbody");
	items.sort(sortAlphabetically("-Name")).forEach(item => {
        tbody.insertAdjacentHTML("afterbegin", `
          <tr>
            <td>${item.Name}</td>
            <td>${layoutPhone(item.Telephone)}</td>
            <td>${layoutPhone(item.Mobile)}</td>
            <td><a href="mailto:${item.Email}">${item.Email}</a></td>
          </tr>
        `);
	 });
}

const cleanTable = () => {
	tbody = document.querySelector("tbody");
	tbody.innerHTML = '';
}

init().then(data => tableAdd(data));

const user = document.querySelector("#filter");

user.addEventListener("search", event => {
    init().then(data => tableAdd(data));
});

user.addEventListener("keyup", event => {
    cleanTable();
    filterUser(user.value.toLowerCase());
});

user.focus();
