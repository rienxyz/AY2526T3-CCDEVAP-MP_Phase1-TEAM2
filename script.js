const buildings = [
  "St. Miguel Hall",
  "Don Enrique Yuchengco Hall",
  "Velasco Hall",
  "Enrique Razon Sports Center",
  "St. Joseph Hall",
  "Gokongwei Hall",
  "St. La Salle Hall",
  "Br. Andrew Gonzales Hall",
  "Science & Technology Research Center",
  "St. Mutien Marie Hall"
];

let building = 0;

const buildingNav = document.getElementById("buildingNav");
const buildingTitle = document.getElementById("buildingTitle");
const buildingContent = document.getElementById("buildingContent");

function renderBuilding() {
  buildingTitle.textContent = buildings[building];

  switch (building) {
    case 0:
      buildingContent.innerHTML = "<div>St. Miguel Hall Content</div>";
      break;
    case 1:
      buildingContent.innerHTML = "<div>Don Enrique Yuchengco Hall Content</div>";
      break;
    case 2:
      buildingContent.innerHTML = "<div>Velasco Hall Content</div>";
      break;
    case 3:
      buildingContent.innerHTML = "<div>Enrique Razon Sports Center Content</div>";
      break;
    case 4:
      buildingContent.innerHTML = "<div>St. Joseph Hall Content</div>";
      break;
    case 5:
      buildingContent.innerHTML = "<div>Gokongwei Hall Content</div>";
      break;
    case 6:
      buildingContent.innerHTML = "<div>St. La Salle Hall Content</div>";
      break;
    case 7:
      buildingContent.innerHTML = "<div>Br. Andrew Gonzales Hall Content</div>";
      break;
    case 8:
      buildingContent.innerHTML =
        "<div>Science & Technology Research Center Content</div>";
      break;
    case 9:
      buildingContent.innerHTML = "<div>St. Mutien Marie Hall Content</div>";
      break;
    default:
      buildingContent.innerHTML = "";
  }
}

buildings.forEach((name, index) => {
  const button = document.createElement("button");

  button.textContent = name;
  button.className = "building-button";

  button.addEventListener("click", () => {
    building = index;
    renderBuilding();
  });

  buildingNav.appendChild(button);
});

renderBuilding();

