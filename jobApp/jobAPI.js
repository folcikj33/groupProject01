//Testing the Adzuna API

//what's up with the %20? => it's UTF encoding for URLs to represent a empty space
var keyword = "software development"; //this should end up being the .val for some user input
var keywordEncoded = encodeURI(keyword);

var where = "chicago";
var locationEncoded = encodeURI(where);

//if 1, only lists permanent positions (fullTime can be added to show both)
var permanent = 0;
//if 1, only lists full-time positions
var fullTime = 1;
//includes positions without listed salary
var salary = 1;

//distance in km
var distance = 20;
//max age of job posting in days
var daysOld = 30;

var queryURL =
  "https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id=e6cd0ed5&app_key=0f19421e3255011b31ce0bf4464db591%09&results_per_page=10&what_phrase=" +
  keywordEncoded +
  "&where=" +
  locationEncoded +
  "&distance=" +
  distance +
  "&max_days_old=" +
  daysOld +
  "&salary_include_unknown=" +
  salary +
  "&full_time=" +
  fullTime +
  "&permanent=" +
  permanent;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(queryURL);

  var database = response.results;
  console.log(database);
  var company = database[0].company.display_name;
  var description = database[0].description;

  console.log(company);
  console.log(description);
  console.log(database.length);

  for (i = 0; i < database.length; i++) {
    var companyList = database[i].company.display_name;
    var companyDiv = $("<div>").attr("class", "company-" + i);
    companyDiv.append(companyList + ": ");

    var titleList = database[i].title;
    companyDiv.append(titleList + " ");

    var description = database[i].description;
    companyDiv.append("<br />" + description + "<br /> ");

    var applyButton = $("<a>")
      .attr("href", database[i].redirect_url)
      .attr("target", "_blank")
      .attr("class", "btn")
      .attr("class", "btn-default")
      .text("Apply!");
    companyDiv.append(applyButton);

    companyDiv.append("<hr />");

    $("#jobs-here").append(companyDiv);
  }
});
