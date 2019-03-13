//Testing the Adzuna API
var queryURL =
  "https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id=e6cd0ed5&app_key=0f19421e3255011b31ce0bf4464db591%09&results_per_page=10&what_phrase=software%20development&where=60611&distance=20&max_days_old=30&salary_include_unknown=1&full_time=1";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var database = response.results;
  console.log(database);
  var company = database[0].company.display_name;
  var description = database[0].description;

  console.log(company);
  console.log(description);

  $("#test-box").html(company);
});
