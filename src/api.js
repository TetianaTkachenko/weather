import axios from "axios"

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid: '1bde20e13818c8244f5027e826a33201',
        units: 'metric'
    }
})

export const weatherApi = {
    getByCityName: (name) => instance.get(`weather?q=${name}`),
    getByCoordinates: (lat, lon) => instance.get(`weather?lat=${lat}&lon=${lon}`)
}
