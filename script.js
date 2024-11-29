const container = document.querySelector('.container');
const searchButton = document.querySelector('.searchbox button');
const searchInput = document.querySelector('.searchbox input');
const searchForm = document.querySelector('.searchbox');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

// Function to perform the search
const performSearch = () => {
    const APIKey = '23bc7eda0ac12613245e2ee41a5b8c8a';
    const city = searchInput.value.trim();

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (json.cod === '404') {
                // City not found, use 404 image
                image.src = 'images/404.png';
                temperature.innerHTML = '';
                description.innerHTML = 'City not found';
                humidity.innerHTML = '';
                wind.innerHTML = '';
                return;
            }

            // Map weather conditions to images
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Rain':
                case 'Drizzle':
                case 'Thunderstorm':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            // Update weather details
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

            // Expand the container to show weather details
            container.style.width = '400px';
            container.style.height = '555px';
            weatherBox.style.display = 'flex';
            weatherDetails.classList.add('show');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

// Prevent form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop the page from reloading
    performSearch(); // Trigger the search
});

// Event listener for search button click
searchButton.addEventListener('click', performSearch);

// Event listener for Enter key press on the input field
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default Enter behavior
        performSearch();
    }
});
