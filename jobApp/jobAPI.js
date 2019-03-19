//firebase database
var config = {
  apiKey: "AIzaSyCAPKQyou0kz6UP-4U1PtI5k9nCGbiZcOk",
  authDomain: "groupproject01-91c86.firebaseapp.com",
  databaseURL: "https://groupproject01-91c86.firebaseio.com",
  projectId: "groupproject01-91c86",
  storageBucket: "groupproject01-91c86.appspot.com",
  messagingSenderId: "187396679104"
};
firebase.initializeApp(config);
//REMEMBER TO CHANGE THIS KEYWORD BECAUSE DATABASE IS USED LATER
var database = firebase.database();
var user;
firebase.auth().onAuthStateChanged(function () {
  user = firebase.auth().currentUser;
  console.log(user);
  currentUserID = user.uid;
  console.log(currentUserID);
  databaseListener(currentUserID)

});

function databaseListener(uid) {
  console.log("tryna listen!")
  database.ref("users").on('child_changed', function (childSnapshot) {
    var user = childSnapshot.val();
    for (var key in user) {

      if (typeof user[key].link === "string" && typeof user[key].job_title === "string") {
        console.log(user[key].link, user[key].job_title);
        //$("#recent-clicks").append(user[key].job_title + "<br />");
        var databaseLinks = $("<a>")
        databaseLinks.attr("href", user[key].link).html("<strong>" + " Link" + "</strong>")

        $("#recent-clicks").prepend(user[key].job_title, databaseLinks);
        $("#recent-clicks").prepend("<hr>");
      }
    }
  })
}

//Testing the Adzuna API

$(document).off("click", "#submit-button").on("click", "#submit-button", function (event) {
  $("#job-results").empty()

  //==================GETS JOB TITLE FROM THE USER-SUBMITTED FORM==========================
  if ($("#exampleFormControlInput1").val()) {
    var jobTitle = $("#exampleFormControlInput1").val()
    // console.log("JOB SEARCH!!", jobTitle)
  } else {
    var jobTitle = $("#exampleFormControlInput1").attr("placeholder")
    // console.log("PLACEHOLDER", jobTitle)
  }
  //what's up with the %20? => it's UTF encoding for URLs to represent a empty space
  var keyword = jobTitle;
  var keywordEncoded = encodeURI(keyword);
  //==================GETS JOB TITLE FROM THE USER-SUBMITTED FORM==========================


  //==================GETS CITY FROM DROPDOWN==============================================
  var city = $("#city-selected option:selected").text();
  // console.log("CITY!!", city)
  var where = city;
  var locationEncoded = encodeURI(where);
  //==================GETS CITY FROM DROPDOWN==============================================


  //==================GETS EMPLOYMENT TYPE FROM DROPDOWN===================================
  var jobType = $("#job-selected option:selected").text();
  // console.log("JOB!!", jobType)
  if (jobType == "Full-Time") {
    var jobAPI = "&full_time=1"
  } else if (jobType == "Part-Time") {
    var jobAPI = "&part_time=1"
  } else if (jobType == "Contract") {
    var jobAPI = "&contract=1"
  } else if (jobType == "permanent") {
    var jobAPI = "&permanent=1"
  }
  //==================GETS EMPLOYMENT TYPE FROM DROPDOWN===================================


  //==================GETS DISTANCE FROM USER-SUBMITTED FORM================================
  //distance in km
  var distance;
  if ($("#exampleFormControlInput2").val()) {
    distance = $("#exampleFormControlInput2").val()
    // console.log("DISTANCE!!", distance)
  } else {
    distance = $("#exampleFormControlInput2").attr("placeholder")
    // console.log("DISTANCE PLACEHOLDER", distance)
  }
  //==================GETS DISTANCE FROM USER-SUBMITTED FORM================================


  //==================GETS AGE FROM USER-SUBMITTED FORM===================================
  //age of job posting in days
  var age;
  if ($("#exampleFormControlInput3").val()) {
    age = $("#exampleFormControlInput3").val()
    // console.log("AGE!!", age)
  } else {
    age = $("#exampleFormControlInput3").attr("placeholder")
    // console.log("AGE PLACEHOLDER", age)
  }
  //==================GETS AGE FROM USER-SUBMITTED FORM===================================


  //includes positions without listed salary
  const salary = 1;

  const queryURL =
    "https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id=e6cd0ed5&app_key=0f19421e3255011b31ce0bf4464db591%09&results_per_page=300&what_phrase=" +
    keywordEncoded +
    //Revature excluded because it's annoying
    "&what_exclude=revature&where=" +
    locationEncoded +
    "&distance=" +
    distance +
    "&max_days_old=" +
    age +
    "&sort_direction=down&sort_by=date&salary_include_unknown=" +
    salary +
    jobAPI

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    // console.log(queryURL);

    var database = response.results;
    // console.log(database);

    //NICK'S IF STATEMENT (tells users if there's no jobs available)==========================================
    if (database.length > 0) {
      //NICK'S IF STATEMENT===================================================================================



      var company = database[0].company.display_name;
      var description = database[0].description;

      // console.log(company);
      // console.log(description);
      // console.log(database.length);

      for (i = 0; i < database.length; i++) {
        var companyList = database[i].company.display_name;
        let newTable = $("<table>").attr("class", "table")
        let tHead = $("<thead>")

        var companyDiv = $("<div>").attr("class", "company-" + i);

        let newTR = $("<tr>")
        let newTH = $("<th>").attr("scope", "col")
        newTH.html(companyList);
        newTH.attr("style", "text-align: center")
        newTR.append(newTH);
        tHead.append(newTR);
        newTable.append(tHead);

        companyDiv.append(newTable);

        var titleList = database[i].title;
        companyDiv.append("<u>" + titleList + "</u>" + ": ");

        var description = database[i].description;
        companyDiv.append("<br />" + description + "<br /> ");

        var applyButton = $("<a>")
          .attr("href", database[i].redirect_url)
          .attr("target", "_blank")
          .attr("class", "btn")
          .attr("class", "btn-default")
          .attr("style", "text-align: center")
          .html("<h4>" + "Apply!" + "</h4>");
        companyDiv.append(applyButton);

        $("#job-results").append(companyDiv);
        // console.log(user);

      }
    } else {
      $("#job-results").append("0 jobs found on Adzuna.")
    }
  })

})


$(document).on("click", "a", function () {

  var link = $(this).attr("href");
  titleDB = $(this).siblings("u").html();
  console.log(titleDB);

  database.ref("users").child(user.uid).push({
    link: link,
    job_title: titleDB
  });

})


