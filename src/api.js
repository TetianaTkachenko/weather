import axios from "axios"

const instance = axios.create({
    baseURL: 'https://www.metaweather.com/'
})

export const weatherApi = {
    getLocationById: (woeid) => instance.get(`api/location/${woeid}`),
    getLocationsList: (queryLocation) => instance.get(`api/location/search?query=${queryLocation}`),
    test: () => instance.get('/api/location/44418/')
}
