$(document).ready(function () {
    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        console.log("this got click");
        $("#city-details").empty()

        let citySelected = $("#city-selected").find(":selected").text();
        let apiCities = {
            "Austin": "austin",
            "Boston": "boston",
            "Charleston": "charleston",
            "Chicago": "chicago",
            "Cincinnati": "cincinnati",
            "Cleveland": "cleveland",
            "Dallas": "dallas",
            "Denver": "denver",
            "Houston": "houston",
            "Honolulu": "honolulu",
            "Las Vegas": "las-vegas",
            "Los Angeles": "los-angeles",
            "Miami": "miami",
            "Milwaukee": "milwaukee",
            "Minneapolis-Saint Paul": "minneapolis-saint-paul",
            "Nashville": "nashville",
            "New York": "new-york",
            "Orlando": "orlando",
            "Palo Alto": "palo-alto",
            "Philadelphia": "philadelphia",
            "Phoenix": "phoenix",
            "Portland, OR": "portland-or",
            "San Diego": "san-diego",
            "San Francisco Bay Area": "san-francisco-bay-area",
            "San Jose": "san-jose",
            "Seattle": "seattle",
            "St. Louis": "st-louis",
            "Washington, D.C.": "washington-dc"
        }

        let searchCity = "";
        // loop through city for search city
        for (let key in apiCities) {
            if (key === citySelected) {
                searchCity = apiCities[key]
                console.log(searchCity)
            }
        }

        let queryURL = "https://api.teleport.org/api/urban_areas/slug%3A" + searchCity + "/scores/"


        // API 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // p tag needed?
            $("#city-details").append("<div class='text-center'><strong>Teleport's Overall City Score: </strong>" + Math.round(response.teleport_city_score) + " out of 100.</div><hr>" + response.summary + "<hr>");
            $("#city-details").append("<div class='text-center'><strong>Quality of Life Category Scores</strong> (10 is the highest)<div><br>");

            // table for category scores
            let cityTable = $("<table class='table'><tr>");
            $("#city-details").append(cityTable);
            for (let i = 0; i < response.categories.length; i++) {
                if (i % 3 === 0) {
                    $("tbody").append("<tr>")
                }
                let detailName = response.categories[i].name;
                console.log(response.categories[0])
                console.log(detailName)
                let detailScore = response.categories[i].score_out_of_10;
                let detailElement = $("<td>");
                // add color borders
                let color = response.categories[i].color
                $(detailElement).attr("style", "border: 3px solid " + color)
                $(detailElement).append(detailName + ": " + detailScore.toFixed(1))
                $("tbody").append(detailElement)
                if (i === 16) {
                    $("tbody").append("<td>")
                }
            }
            $("#city-details").append("For more details on Teleport's scoring, visit <a target='_blank' href='https://teleport.org/cities/" + searchCity + "'>Teleport</a>")
        });


    });

});
