window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(
        ".temperature-degree"
    );
    let locationTimezone = document.querySelector(
        ".location-time"
    );
    let temperatureSection = document.querySelector(
        ".temperature"
    );
    const temperatureSpan = document.querySelector(
        ".temperature span"
    );
    let locationIcon = document.querySelector(
        '.weather-icon'
    );


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => { 
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=77d10e8f42661408ca745382a78f0a48`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temp } = data.current;
                const { description } = data.current.weather[0];
                const { icon } = data.current.weather[0].icon;
                //Set DOM elements from the api
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.timezone;
                locationIcon.innerHTML = `<img src="icons/cloudy.svg">`;
                
                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                    } else {
                        temperatureSpan.textContent = "F";
                    }
                });

            });
        });        
    }
});

