import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

let addressCoonrdinates
let geocoder

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

export async function displayMap(getCoordinates) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmFmY3J1IiwiYSI6ImNrendxaGwzMzAyYTMydXJ2aHB3dzJ4OWoifQ.wj9FjHmT9tlzBVeZXdx9Sw'
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })

  // Add the control to the map.

  geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    localGeocoder: coordinatesGeocoder,
    zoom: 4,
    placeholder: 'Try: -40, 170',
    mapboxgl,
    reverseGeocode: true,
  }).on('result', (selected) => {
    addressCoonrdinates = selected
    getCoordinates(addressCoonrdinates)
    console.log('Selected geo: ', addressCoonrdinates)
  })

  map.addControl(geocoder)
}

// let marker
// function onHandleMapClick(e, mapReaction) {
//   const lat = e.lngLat.lat
//   const lng = e.lngLat.lng
//   console.log(`You clicked the map at LAT: ${lat} and LONG: ${lng}`)
//   // Clear existing marker,
//   if (marker !== undefined) {
//     marker.remove()
//   }
//   marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
//   console.log(marker)
//   const coordinates = [e.latlng.lat, e.latlng.lng]
//   mapReaction(coordinates)
// }

// export function enableMapCoordinates(mapReaction) {
//   map.on('click', (e) => {
//     onHandleMapClick(e, mapReaction)
//   })
// }
