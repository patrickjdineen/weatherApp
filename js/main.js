const weatherKey = "053eed9c2797718cdaf696364219613a"

//conversion of kelvin to F and rounded
//No longer needed kelvin conversion with imerial tag in API call, but use this function for rounding
roundNum = (num) => {
    let rounded = Math.round(num*10)/10;
    return rounded
}
//function to calculate cardinal direction of wind based on degree
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
    document.getElementById("city").innerHTML=data.name;
    document.getElementById("country").innerHTML= data.sys.country
    document.getElementById("high").innerHTML = `${roundNum(data.main.temp_max)} F`;
    document.getElementById("low").innerHTML =`${roundNum(data.main.temp_min)} F`;
    document.getElementById("feel").innerHTML =`${roundNum(data.main.feels_like)} F`;
    document.getElementById("description").innerHTML=data.weather[0].description;
    document.getElementById("humid").innerHTML = `${data.main.humidity} %`;
    document.getElementById("wind").innerHTML = `${roundNum(data.wind.speed)} MPH`;
    document.getElementById("cloud").innerHTML = `${data.clouds.all} %`;
    document.getElementById("wind-dir").innerHTML = windDirection(data.wind.deg);
    return data
}
