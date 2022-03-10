// let map
// let tiles
// let marker = {}
// export async function displayMap() {
//   map = L.map('map', {
//     minZoom: 1,
//   }).setView([51.505, -0.09], 13)

//   tiles = L.tileLayer(
//     'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
//     {
//       maxZoom: 18,
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//       id: 'mapbox/streets-v11',
//       tileSize: 512,
//       zoomOffset: -1,
//     },
//   ).addTo(map)
// }

// export function enableMapCoordinates(mapReaction) {
//   map.on('click', (e) => {
//     onHandleMapClick(e, mapReaction)
//   })
// }

// function onHandleMapClick(e, mapReaction) {
//   const lat = e.latlng.lat
//   const lon = e.latlng.lng

//   console.log(`You clicked the map at LAT: ${lat} and LONG: ${lon}`)
//   // Clear existing marker,

//   if (marker !== undefined) {
//     map.removeLayer(marker)
//   }
//   marker = L.marker(e.latlng).addTo(map)
//   marker.bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup()
//   const coordinates = [e.latlng.lat, e.latlng.lng]
//   mapReaction(coordinates)
// }

// export function deleteMarker() {
//   map.removeLayer(marker)
// }
