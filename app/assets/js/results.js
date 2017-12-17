$(document).ready(function () {
    $("#searchCity").submit(function (event) {
        event.preventDefault();
        var city = $('#city').val().trim();
        $.get("/api/city", {city: city}, function (res) {
            var safeScore = res.city.violent_crimes + res.city.property_crimes;
            res.city.Score = "fair";
            if (safeScore < 20){
                res.city.Score = "good";
            };
            if (safeScore > 30){
                res.city.Score = "bad";
            }
            console.log(res);
            var theTemplateScript = $("#results-template").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            $("#results").html(theTemplate(res));
        });
        $.get("/api/comments", {city: city}, function (res) {
            console.log(res);
            var theTemplateScript = $("#comments-template").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            $(".commentList").html(theTemplate(res));
        });
    });
});
