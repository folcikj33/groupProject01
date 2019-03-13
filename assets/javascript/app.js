
let searchCity = "chicago";
let queryURL = "https://api.teleport.org/api/urban_areas/slug%3A" + searchCity + "/scores/"


// API 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    // p tag needed?
    $("#city-details").append(Math.round(response.teleport_city_score) + " out of 100.", response.summary);
    for (let i = 0; i < response.categories.length; i++) {
        let detailName = response.categories[i].name;
        console.log(response.categories[0])
        console.log(detailName)
        let detailScore = response.categories[i].score_out_of_10;
        let detailElement = $("<p>");
        $(detailElement).append(detailName + ": " + detailScore.toFixed(1) + " (out of 10)")
        $("#city-details").append(detailElement)
    }

});