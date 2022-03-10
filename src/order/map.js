import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

const coordinatesGeocoder = function geoCode(query) {
  // Match anything which looks like
  // decimal degrees coordinate pair.
  const matches = query.match(
    /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i,
  )
  if (!matches) {
    return null
  }

  function coordinateFeature(lng, lat) {
    return {
      center: [lng, lat],
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      place_name: `Lat: ${lat} Lng: ${lng}`,
      place_type: ['coordinate'],
      properties: {},
      type: 'Feature',
    }
  }

  const coord1 = Number(matches[1])
  const coord2 = Number(matches[2])
  const geocodes = []

  if (coord1 < -90 || coord1 > 90) {
    // must be lng, lat
    geocodes.push(coordinateFeature(coord1, coord2))
  }

  if (coord2 < -90 || coord2 > 90) {
    // must be lat, lng
    geocodes.push(coordinateFeature(coord2, coord1))
  }

  if (geocodes.length === 0) {
    // else could be either lng, lat or lat, lng
    geocodes.push(coordinateFeature(coord1, coord2))
    geocodes.push(coordinateFeature(coord2, coord1))
  }

  return geocodes
}

export async function displayMap() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmFmY3J1IiwiYSI6ImNrendxaGwzMzAyYTMydXJ2aHB3dzJ4OWoifQ.wj9FjHmT9tlzBVeZXdx9Sw'
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })

  // Add the control to the map.
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      localGeocoder: coordinatesGeocoder,
      zoom: 4,
      placeholder: 'Try: -40, 170',
      mapboxgl,
      reverseGeocode: true,
    }),
  )
  map.addControl(new mapboxgl.NavigationControl())
}

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

// export function enableMapCoordinates(mapReaction) {
//   map.on('click', (e) => {
//     onHandleMapClick(e, mapReaction)
//   })
// }
