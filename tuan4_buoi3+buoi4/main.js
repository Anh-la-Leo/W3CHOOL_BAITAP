const body = document.getElementById("body");
const button = document.getElementById("button");
getMap();
function getMap() {
  button.addEventListener("click", () => {
    let divMap = document.createElement("div");
    divMap.setAttribute(
      "style",
      "height: 300px; width: 800px; margin: 30px auto;"
    );
    divMap.id = "map";
    body.appendChild(divMap);

    try {
      navigator.geolocation.getCurrentPosition(showPosition);
      document.addEventListener("click", (event) => {
        if (!button.contains(event.target) && !divMap.contains(event.target)) {
            body.removeChild(divMap);
        }
      });
    } catch {
      console.log(err);
    }
  });
}
function showPosition(position) {
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  const map = L.map("map");
  map.setView(pos, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 50,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker(pos).addTo(map);
}