const GoogleMapsAPI = "https://maps.googleapis.com/maps/api"

const getAddressFromCoords = (lat:number,lng:number) => {
    const url = `${GoogleMapsAPI}/geocode/json?latlng=${lat},${lng}`

    return fetch(url).then(res=>res.json()).then(json=>{
        return json.results[0].formatted_address
    })
}

export default getAddressFromCoords