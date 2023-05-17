const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
};


function addData(obj) {
    data.push(obj);
    updateDom();
};

function updateDom(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
};
 
function formatMoney(num) {
    return `${'₹ '}` + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    })
    updateDom();
};

function sortMoney() {
    data.sort((a, b) => b.money - a.money);
    updateDom();
};

function millionaire() {
    data = data.filter(user => (user.money > 1000000));
    updateDom();
};

function calculateMoney() {
    paisa = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement  = document.createElement('div');
    wealthElement.innerHTML = `<h3 style="color: green;">Total Wealth <strong style="color:blue";> ${formatMoney(paisa)} </strong></h3>`;
    main.appendChild(wealthElement);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showMillionairesBtn.addEventListener('click', millionaire);
calculateWealthBtn.addEventListener('click', calculateMoney);