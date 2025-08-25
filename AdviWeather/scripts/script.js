$(document).ready(function() {
    var apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast";
    var apiKey = process.env.OPENWEATHER_API_KEY || "YOUR_API_KEY_HERE";

    $("#searchBtn").click(function() {
        var location = $("#location").val();
        if (!location || location.trim() === "") {
            alert("Please enter a location");
            return;
        }
        var queryUrl = apiEndpoint + "?q=" + encodeURIComponent(location) + "&cnt=5&units=metric&appid=" + apiKey;
        $.ajax({
            url: queryUrl,
            method: "GET",
            success: function(response) {
                console.log("Weather data received for location");
                var forecastHtml = "";
                for (var i = 0; i < response.list.length; i++) {
                    var date = new Date(response.list[i].dt * 1000);
                    var dayOfWeek = date.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric' });

                    var weatherIconUrl = "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    var minTemp = response.list[i].main.temp_min.toFixed(1);
                    var maxTemp = response.list[i].main.temp_max.toFixed(1);
                    var description = $('<div>').text(response.list[i].weather[0].description).html();
                    forecastHtml += "<div class='day'>" +
            "<div class='date'>" + dayOfWeek + "</div>" +
            "<div class='weather-icon'><img src='" + weatherIconUrl + "'></div>" +
            "<div class='temp'>" + maxTemp + "°C / " + minTemp + "°C</div>" +
            "<div class='description'>" + description + "</div>" +
        "</div>";

                }
                $("#forecast").empty().append(forecastHtml);
            },
            error: function() {
                console.error("Error fetching forecast");
                $("#forecast").text("Unable to fetch weather data. Please try again.");
            }
        });
    });
});