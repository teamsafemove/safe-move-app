$(document).ready(function () {
    $("#searchCity").submit(function (event) {
        event.preventDefault();
        var city = $('#city').val().trim();
        $.get("/api/city/results", {city: city}, function (res) {
            console.log(res);
        })
    });
});
