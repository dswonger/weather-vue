<template>
  <div>
    <form v-on:submit.prevent="getWeather">
      <label>Enter Zipcode: </label>
      <input type="text" v-model="zipcode" />
      <input type="submit" value="Get Weather" />
    </form>
    <div v-show=" lat != ''">
        You are in {{ name }}.
        Your latitude is {{  lat }} and longitude is {{  lon }}
    </div>
    <div v-show=" temp != ''">
        Today's temp is {{  temp }} and it feel like {{  feelsLike }}
    
        {{ description }}
    </div>
        <img :src="image" alt="" />

        <div id="openweathermap-widget-11"></div>
  </div>
  
</template>

<script>
import service from '../services/WeatherService.js';
export default {
  data() {
    return {
      zipcode: "",
      lat:"",
      lon: "",
      name: "",
      temp: "",
      feelsLike: "",
      description: "",
      id: "",
      icon: "",
      image:""
    };
  },
  methods: {
    getWidget() {
      // let src='//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js'
      window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);

      window.myWidgetParam.push({
        id: 11,
        cityid: this.id,
        appid: "95b38a15a365ad53200a24d381962f21",
        units: "imperial",
        containerid: "openweathermap-widget-11",
      });

      let script = document.createElement("script");
      script.async = true;
      script.charset = "utf-8";
      script.src =
        "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(script, s);
    },
    getWeather(){
        service.getLatLon(this.zipcode)
        .then((response) => {
            // console.log(response);
            this.lat = response.data.lat;
            this.lon = response.data.lon;
            this.name = response.data.name;
            service.getWeather(this.lat, this.lon)
            .then((response) => {
                console.log(response.data);
                this.temp = response.data.main.temp;
                this.feelsLike = response.data.main.feels_like;
                this.description = response.data.weather[0].description;
                this.icon = response.data.weather[0].icon;
                this.image = "https://openweathermap.org/img/wn/" +
            this.icon +
            "@2x.png";
            this.id = response.data.id;
            this.getWidget();
            })

        })
    }
  }
};
</script>

<style>
</style>