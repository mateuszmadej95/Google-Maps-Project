// get DOM elements
const addressInput = document.querySelector("#address");
const form = document.querySelector("#form");
const labelText = document.querySelector("#label-text");
const arrow = document.querySelector("#arrow");
const container = document.querySelector("#container");

// Get address from LS or set it to default
let address;
if (localStorage.getItem("address") !== null) {
  address = localStorage.getItem("address");
} else {
  address = "London";
}

// initialize google maps
let map;
initMap = () => {
  const geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 16,
  });

  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
};

// error message
function setMessage(msg, color) {
  labelText.innerHTML = msg;
  labelText.style.color = color;
}

// add form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addressInput.value.length > 1) {
    address = addressInput.value;
    // set LS with input value
    localStorage.setItem("address", addressInput.value);
    // reload map with input value address
    initMap();
    addressInput.value = "";
  } else {
    setMessage("Insert correct address", "salmon");
    setTimeout(() => {
      setMessage("Find Your Location", "#fff");
    }, 3000);
  }
});

// add click event to arrow
arrow.addEventListener("click", () => {
  arrow.classList.toggle("open");
  container.classList.toggle("open");
});
