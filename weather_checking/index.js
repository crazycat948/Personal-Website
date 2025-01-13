/*
<h1 class ="cityDisplay">Dallas</h1>
            <p class = "tempDisplay">90°</p>
            <p class = "humidityDisplay">Humidity: 75% </p>
            <p class ="descDisplay">Clear Skies</p>
            <p class = "weatherEmoji">🌞</p>
            <p class = "errorDisplay">Please Enter a City</p>
*/

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const tips = document.querySelector(".tips");
const apiKey = "0e14f32f45db53a6defcc54b79a3c87b";

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please Enter a City");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiurl);

    if(!response.ok){
        throw new Error("Could you enter a vaild city name?");
    }

    return await response.json();
    
}

function displayWeatherInfo(data){


    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]} = data;

        getWeatherBackground(id);

    card.textContent = "";
    card.style.display= "flex";
    
    tips.textContent ="";
    tips.style.display="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    const weatherTip = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    weatherTip.textContent = `Tips: ${getWeatherTip(id)}`;



    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    weatherTip.classList.add("weatherTip");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

    tips.appendChild(weatherTip);

}
function getWeatherTip(weatherId){
    switch(true){
        case (weatherId >=200 && weatherId < 300):
            return "During a thunderstorm, stay indoors and avoid using electrical appliances. If you're outside, seek shelter immediately and stay away from tall objects, open fields, and bodies of water. Safety first!";
        case (weatherId >=300 && weatherId < 400):
            return "Drizzle might seem light, but it can still leave you damp. Wear a waterproof jacket or carry an umbrella to stay dry. It's also a great time to enjoy a peaceful walk or a cozy café visit!";
        case (weatherId >=500 && weatherId < 600):
            return "When it's raining, don't forget your umbrella, raincoat, or waterproof boots to stay dry. Be cautious of slippery surfaces, and if you're driving, ensure good visibility by using your headlights and windshield wipers. It's a perfect day for a warm drink indoors!";
        case (weatherId >=600 && weatherId < 700):
            return "When it’s snowing, bundle up in warm layers, including a hat, gloves, and waterproof boots. Be cautious of icy surfaces and drive carefully if you must go out. It's also a great time to enjoy hot cocoa or build a snowman!";
        case (weatherId >=700 && weatherId < 800):
            return "In atmospheric conditions, visibility may be low, so if you're driving, use low-beam headlights and reduce your speed. If you're outdoors, wear reflective clothing to stay visible, and consider a face mask if the air quality is poor. Stay safe!";
        case (weatherId === 800):
            return "Clear skies are perfect for outdoor activities! Take advantage of the beautiful weather to go for a walk, have a picnic, or stargaze at night. Don't forget sunscreen if you're out during the day!";
        case (weatherId >= 801 && weatherId <810):
            return "Cloudy skies are great for outdoor activities without the harsh sun! However, the weather can change quickly, so it’s a good idea to keep a light jacket or umbrella handy, just in case.";
            default:
            return "";
    }


} 
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >=200 && weatherId < 300):
            return "⚡";
        case (weatherId >=300 && weatherId < 400):
            return "💦";
        case (weatherId >=500 && weatherId < 600):
            return "🌧️";
        case (weatherId >=600 && weatherId < 700):
            return "❄️";
        case (weatherId >=700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId <810):
            return "☁️";
            default:
            return "❓";
    }
}
function getWeatherBackground(weatherId)
{
    switch(true){
        case (weatherId >=200 && weatherId < 300):
            document.body.style.backgroundImage = "url('image/Thunderstorm.jpg')";
            break;
        case (weatherId >=300 && weatherId < 400):
            document.body.style.backgroundImage = "url('image/Drizzle.jpg')";
            break;
        case (weatherId >=500 && weatherId < 600):
            document.body.style.backgroundImage = "url('image/Rain.jpg')";
            break;
        case (weatherId >=600 && weatherId < 700):
            document.body.style.backgroundImage = "url('image/Snow.jpg')";
            break;
        case (weatherId >=700 && weatherId < 800):
            document.body.style.backgroundImage = "url('image/Atmosphere.jpg')";
            break;
        case (weatherId === 800):
            document.body.style.backgroundImage = "url('image/Clear.jpg')";
            break;
        case (weatherId >= 801 && weatherId <810):
            document.body.style.backgroundImage = "url('image/Clouds.jpg')";
            break;
            default:
                document.body.style.backgroundColor = "white";
                break;
    }


}
function displayError(msg){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent =msg;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    tips.textContent = "";
    tips.style.display = "flex";
    card.appendChild(errorDisplay);
    tips.appendChild(errorDisplay);

}