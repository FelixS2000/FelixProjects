$(document).ready(function() {
    var apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast";
    var apiKey = "56695f14f0aa586a632190a228b54d7d";

    $("#searchBtn").click(function() {
        var location = $("#location").val();
        var queryUrl = apiEndpoint + "?q=" + location + "&cnt=5&units=metric&appid=" + apiKey;
        $.ajax({
            url: queryUrl,
            method: "GET",
            success: function(response) {
                console.log(response);
                var forecastHtml = "";
                for (var i = 0; i < response.list.length; i++) {
                    var date = new Date(response.list[i].dt * 1000);
                    var dayOfWeek = date.toLocaleDateString("en-US", { weekday: 'long' });
                  var dayOfWeek = date.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric' });

                    var weatherIconUrl = "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    var minTemp = response.list[i].main.temp_min.toFixed(1);
                    var maxTemp = response.list[i].main.temp_max.toFixed(1);
                    var description = response.list[i].weather[0].description;
                    forecastHtml += "<div class='day'>" +
            "<div class='date'>" + dayOfWeek + "</div>" +
            "<div class='weather-icon'><img src='" + weatherIconUrl + "'></div>" +
            "<div class='temp'>" + maxTemp + "°C / " + minTemp + "°C</div>" +
            "<div class='description'>" + description + "</div>" +
        "</div>";

                }
                $("#forecast").html(forecastHtml);
            },
            error: function() {
                alert("Error fetching forecast");
            }
        });
    });
});