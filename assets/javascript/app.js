$(document).ready(function () {
    console.log(document);


    let searchCity = "chicago";
    let queryURL = "https://api.teleport.org/api/urban_areas/slug%3A" + searchCity + "/scores/"

    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        console.log("this got click");

        // API 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // p tag needed?
            $("#city-details").append("<strong>Overall City Score: </strong>" + Math.round(response.teleport_city_score) + " out of 100.<hr>", response.summary);
            for (let i = 0; i < response.categories.length; i++) {
                let detailName = response.categories[i].name;
                console.log(response.categories[0])
                console.log(detailName)
                let detailScore = response.categories[i].score_out_of_10;
                let detailElement = $("<p>");
                // add color
                let color = response.categories[i].color
                $(detailElement).attr("style", "color: " + color)
                $(detailElement).append(detailName + ": " + detailScore.toFixed(1) + " (out of 10)")
                $("#city-details").append(detailElement)
            }
        });


    });

});
