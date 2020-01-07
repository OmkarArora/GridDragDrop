let users = [
  {
    firstName: "Carol",
    lastName: "Danvers"
  },
  {
    firstName: "Clint",
    lastName: "Barton"
  },
  {
    firstName: "Shoto",
    lastName: "Todoroki"
  },
  {
    firstName: "Izuku",
    lastName: "Midoriya"
  },
  {
    firstName: "Beerus",
    lastName: ""
  },
  {
    firstName: "Kai",
    lastName: "Chisaki"
  },
  {
    firstName: "Eijiro",
    lastName: "Kirishima"
  },
  {
    firstName: "Ben",
    lastName: "Parker"
  },
  {
    firstName: "Peter",
    lastName: "Quill"
  },
  {
    firstName: "Reed",
    lastName: "Richards"
  },
  {
    firstName: "Susan",
    lastName: "Storm"
  },
  {
    firstName: "Ben",
    lastName: "Grimm"
  },
  {
    firstName: "Johnny",
    lastName: "Storm"
  },
  {
    firstName: "Robert",
    lastName: "Stark"
  },
  {
    firstName: "Steve",
    lastName: "Rogers"
  }
];

let recommenderMap = new Map();
let availableUsersHTML = [];
let allUsers = [];
let sidePanelElement = document.querySelector(".scrollBar");
let grid = document.querySelector(".grid-container");
let nameGrid = "";
let tableGrid = "";
let numberOfCells = 48;
function initialise() {
  for (let i = 0; i < users.length; i++) {
    let newUser = `<div id ="${"user" + i}" 
    class="username" draggable="true" ondragstart="dragStarted(event)">
    <p>${users[i].firstName + " " + users[i].lastName}</p></div>`;

    nameGrid += newUser;
    availableUsersHTML.push(newUser);
    allUsers.push(newUser);
  }
  sidePanelElement.innerHTML = "<p>" + nameGrid + "</p>";
  for (let i = 0; i < numberOfCells; i++) {
    let newCell = `<div id = "${"cell" + i}" class="grid-item"
      ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
    tableGrid += newCell;
  }
  grid.innerHTML = tableGrid;

  for (let i = 0; i < numberOfCells; i++) {
    recommenderMap.set(`cell${i}`, false);
  }
  console.log(recommenderMap);
}

function dragStarted(event) {
  event.dataTransfer.setData("text", event.target.id);
  recommendCell();
}
function recommendCell() {
  for (let i = 0; i < numberOfCells; i++) {
    if (document.getElementById(`cell${i}`).innerHTML == "")
      recommenderMap.set(`cell${i}`, false);
  }
  for (let i = 0; i < numberOfCells; i++) {
    if (recommenderMap.get(`cell${i}`) === false) {
      document.getElementById(`cell${i}`).style = "background-color: #BFBFBF";
      console.log(`cell${i}`);
      break;
    }
  }
}
function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  userCell = document.getElementById(data);
  for (let i = 0; i < availableUsersHTML.length; i++) {
    if (availableUsersHTML[i].includes(userCell.id)) {
      availableUsersHTML.splice(i, 1);
      break;
    }
  }
  userCell.style = "border-style:none";

  let cancelBtn = `<img id=${"cancel" +
    userCell.id} src="./images/letter-x.svg" onClick="removeUser(this)" style="width:20px; height: 15px"/>`;
  if (!userCell.innerHTML.includes("img")) userCell.innerHTML += cancelBtn;
  event.target.appendChild(userCell);
  recommenderMap.set(`${event.target.id}`, true);
  console.log(
    `${event.target.id}` + " " + recommenderMap.get(`${event.target.id}`)
  );
}

function allowDrop(event) {
  event.preventDefault();
}

function removeUser(imgElement) {
  let delId = imgElement.id.substring(6);
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].includes(delId)) {
      availableUsersHTML.push(allUsers[i]);
      break;
    }
  }
  let newAvailableUsers = "";
  for (let i = 0; i < availableUsersHTML.length; i++) {
    newAvailableUsers += availableUsersHTML[i];
  }
  document.getElementById(delId).remove();
  console.log(newAvailableUsers);
  sidePanelElement.innerHTML = "<p>" + newAvailableUsers + "</p>";
}
document.addEventListener(
  "dragend",
  function(event) {
    for (let i = 0; i < numberOfCells; i++) {
      document.getElementById(`cell${i}`).style = "background-color: white";
    }
  },
  false
);
