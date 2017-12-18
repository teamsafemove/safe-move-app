$(document).ready(function () {
    $("#searchCity").submit(function (event) {
        event.preventDefault();
        var city = $('#city').val().trim();
        $.get("/api/city", { city: city }, function (res) {
            var safeScore = res.city.violent_crimes + res.city.property_crimes;
            res.city.Score = "fair";
            if (safeScore < 20) {
                res.city.Score = "good";
            };
            if (safeScore > 30) {
                res.city.Score = "bad";
            }
            var theTemplateScript = $("#results-template").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            $("#results").html(theTemplate(res));
        });
        showComments(city);
    });

    $("#add-comment").click(function (event) {
        event.preventDefault();
        var city = $('#city').val().trim();
        var newComment = $('#new-comment').val().trim();
        $('#new-comment').val("");
        $.post("/api/comments", { comment: newComment, city: city }, function (res) {
            showComments(city);
        })
    });

    function showComments(city) {
        $.get("/api/comments", { city: city }, function (res) {
            for (var i = 0; i < res.comments.length; i++) {
                var comment = res.comments[i];
                console.log(comment.createdAt);
                comment.Date = Intl.DateTimeFormat('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                }).format(new Date(comment.createdAt));
            }
            var theTemplateScript = $("#comments-template").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            $(".commentList").html(theTemplate(res));
        });

    }
});
