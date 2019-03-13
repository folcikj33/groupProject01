//Testing the Adzuna API

//what's up with the %20? => it's UTF encoding for URLs to represent a empty space
var keyword = "software development"; //this should end up being the .val for some user input
var keywordEncoded = encodeURI(keyword);
console.log(keywordEncoded);
//distance in km
var distance = 20;
//max age of job posting in days
var daysOld = 10;

var queryURL =
  "https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id=e6cd0ed5&app_key=0f19421e3255011b31ce0bf4464db591%09&results_per_page=10&what_phrase=" +
  keywordEncoded +
  "&where=60611&distance=" +
  distance +
  "&max_days_old=" +
  daysOld +
  "&salary_include_unknown=1&full_time=1";

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

  //$("#test-box").html(company);

  for (i = 0; i < database.length; i++) {
    var companyList = database[i].company.display_name;
    console.log(companyList);
    //newDiv.append(companyList);
    //$("#test-box").append(companyList);
  }
});
