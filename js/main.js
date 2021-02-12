const weatherKey = "053eed9c2797718cdaf696364219613a"
//declaration of global variables
let cityName
let weatherCity
let weatherCountry
let weatherHigh
let weatherLow
let weatherFeel
let weatherDesc
let weatherHumid
let windSpeed
let windDir
let cloudCover

//conversion of kelvin to F and rounded
//No longer needed kelvin conversion with imerial tag in API call, but use this function for rounding
roundNum = (num) => {
    let rounded = Math.round(num*10)/10;
    return rounded
}
fillWeather = () => {
    document.getElementById("city").innerHTML = weatherCity;
    document.getElementById("country").innerHTML = weatherCountry;
    document.getElementById("feel").innerHTML = weatherFeel;
    document.getElementById("high").innerHTML = weatherHigh;
    document.getElementById("low").innerHTML = weatherLow;
    document.getElementById("description").innerHTML = weatherDesc;
    document.getElementById("humid").innerHTML = weatherHumid;
    document.getElementById("wind").innerHTML = windSpeed;
    document.getElementById("cloud").innerHTML = cloudCover;
    document.getElementById("wind-dir").innerHTML = windDir;
}

windDirection = (deg) =>{
    if (deg >0 && deg < 45){
        return 'N'
    } else if (deg >45 && deg <135 ){
        return 'E'
    } else if(deg >135 && deg < 225){
        return "S"
    } else if (deg > 225 && deg < 315){
        return "W"
    } else{
        return "N"
    }
}

//Function to get city name from form, pass it to the API call, and fill global variable with data
async function getData() {
    cityName = document.getElementById('city-name').value;
    countryName = document.getElementById('country-name').value;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${weatherKey}&units=imperial`);
    data = await response.json();
    console.log(data);
    weatherCity = data.name;
    weatherCountry = data.sys.country
    weatherCountry = data.sys.country
    weatherHigh = `${roundNum(data.main.temp_max)} F`;
    weatherLow = `${roundNum(data.main.temp_min)} F`;
    weatherFeel = `${roundNum(data.main.feels_like)} F`;
    weatherDesc = data.weather[0].description;
    weatherHumid = `${data.main.humidity} %`;
    windSpeed = `${roundNum(data.wind.speed)} MPH`;
    cloudCover = `${data.clouds.all} %`;
    windDir = windDirection(data.wind.deg);
    fillWeather()
    return data
}
