import axios from 'axios';

const http = axios.create({
    baseURL : "http://api.openweathermap.org/"
});

const key = "95b38a15a365ad53200a24d381962f21";

export default {
    getLatLon(zipcode){
        return http.get('geo/1.0/zip?zip=' + zipcode + '&appid=' + key);
    },

    getWeather(lat, lon){
        return http.get(`data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`);
    }
}