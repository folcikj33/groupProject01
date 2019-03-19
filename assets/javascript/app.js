$(document).ready(function () {
    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        $("#city-details").empty()

        let citySelected = $("#city-selected").find(":selected").text();
        let apiCities = {
            "Atlanta": "atlanta",
            "Austin": "austin",
            "Boston": "boston",
            "Charleston": "charleston",
            "Chicago": "chicago",
            "Cincinnati": "cincinnati",
            "Cleveland": "cleveland",
            "Colorado Springs": "colorado-springs",
            "Columbus": "columbus",
            "Dallas": "dallas",
            "Denver": "denver",
            "Des Moines": "des-moines",
            "Houston": "houston",
            "Honolulu": "honolulu",
            "Indianapolis": "indianapolis",
            "Kansas City": "kansas-city",
            "Las Vegas": "las-vegas",
            "Los Angeles": "los-angeles",
            "Miami": "miami",
            "Milwaukee": "milwaukee",
            "Minneapolis-Saint Paul": "minneapolis-saint-paul",
            "Nashville": "nashville",
            "New Orleans": "new-orleans",
            "New York": "new-york",
            "Orlando": "orlando",
            "Palo Alto": "palo-alto",
            "Philadelphia": "philadelphia",
            "Phoenix": "phoenix",
            "Portland, OR": "portland-or",
            "Salt Lake City": "salt-lake-city",
            "San Diego": "san-diego",
            "San Francisco Bay Area": "san-francisco-bay-area",
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


        // Teleport API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Print summary content
            $("#city-details").append("<div class='text-center'><h4>" + citySelected + "</h4><div><div class='text-center'><strong>Teleport's Overall City Score: </strong>" + Math.round(response.teleport_city_score) + " out of 100.</div><hr>" + response.summary + "<hr>");
            $("#city-details").append("<div><strong>Quality of Life Category Scores</strong> (10 is the highest)<div><br>");

            // Print table for category scores
            let cityTable = $("<table class='table table-responsive'><tr>");
            $("#city-details").append(cityTable);
            for (let i = 0; i < response.categories.length; i++) {
                if (i % 2 === 0) {
                    $("tbody").append("<tr>")
                }
                let detailName = response.categories[i].name;
                console.log(response.categories[0])
                console.log(detailName)
                let detailScore = response.categories[i].score_out_of_10;
                let detailElement = $("<td class='text-center'>");
                // add color borders
                let color = response.categories[i].color
                $(detailElement).attr("style", "border: 3px solid " + color)
                $(detailElement).append(detailName + ":<br> " + detailScore.toFixed(1))
                $("tbody").append(detailElement)
                if (i === 16) {
                    $(detailElement).attr("colspan", "2")
                }
            }// Print a URL for users redirect users to Teleport's data for this city
            $("#city-details").append("For more details on Teleport's scoring, visit <a target='_blank' href='https://teleport.org/cities/" + searchCity + "'>Teleport</a>")
        });


    });

});
