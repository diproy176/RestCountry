document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const modalContent = document.getElementById('modalContent');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchCountryData(searchTerm);
        } else {
            alert('Please enter a country name.');
        }
    });

    function fetchCountryData(countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                displayCountryData(data);
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    }

    function fetchWeatherData(capital) {
        const apiKey = '9daf00ce3a9f9135e9ef332d11cccb13'; // Replace with your weather API key


        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`)
            .then(response => response.json())
            .then(weather => {
                displayWeatherData(weather);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayCountryData(data) {
        resultsContainer.innerHTML = '';
        data.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('col-md-4', 'col-sm-6', 'mb-4');
            countryDiv.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <p class="card-text">Capital: ${country.capital}</p>
                        <p class="card-text">Population: ${country.population}</p>
                        <button class="btn btn-primary mt-2 detailsButton">More Details</button>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(countryDiv);

            const detailsButton = countryDiv.querySelector('.detailsButton');
            detailsButton.addEventListener('click', () => {
                displayAdditionalData(country);
                fetchWeatherData(country.capital[0]);
            });
        });
    }

    function displayAdditionalData(country) {
        modalContent.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Flag:</strong> <img src="${country.flags.png}" alt="Flag" class="img-fluid"></p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
        `;
        new bootstrap.Modal(document.getElementById('countryModal')).show();
    }

    function displayWeatherData(weather) {
        modalContent.innerHTML += `
            <h3>Weather Details</h3>
            <p><strong>Temperature:</strong> ${weather.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${weather.main.humidity}%</p>
            <p><strong>Condition:</strong> ${weather.weather[0].description}</p>
        `;
    }
});
