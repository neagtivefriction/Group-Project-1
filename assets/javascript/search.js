// user types their search
// search provides prediction from array of movies
// submit button is pressed and searchInput created for OMDB API call
// if search is empty alert modal telling the user to enter something

$(document).ready(function() {
  // check the submit button is working and show search value
  $("#searchButton").on("click", function() {
    // console.log("search button clicked");
    // console.log("click produces: ", $("#searchText").val());
    event.preventDefault();
    // call the validateSearch function
    validateSearch();
    // clear the#searchText field as no longer needed
    //$("#searchText").val(" ");
  });

  //Trigger search button click event by hitting enter key
  $("#searchText").keypress(function(enter) {
    if (enter.which == 13) {
      // $("#searchButton").click();
      validateSearch();
    }
  });

  var specialCharacters = "~`#$%^*+=[]\\'/{}|\"<>";

  function validateSearch() {
    // console.log("this is our movie search val!!", $("#searchText").val());
    var searchInput = $("#searchText")
      .val()
      .trim();

    $("#searchText").val("");

    if (searchInput === "") {
      //alert("Please enter a Movie Title"); // alert to be changed to modal
      console.log("Search Input is " + searchInput);
      // $("#searchButton").attr("href", "#modal1");
      $(".modal").modal();
      $("#modal1").modal("open");
      // searchInput = "error";
      return false;
    }
    // for (var i = 0; i < searchInput.length; i++) {
    //   if (specialCharacters.indexOf(searchInput.charAt(i)) !== -1) {
    //     //alert("Please enter a Movie Title with no special characters"); // alert to be changed to modal
    //     // console.log("This is working");
    //     $("#searchButton").attr("href", "#modal2");
    //     $(".modal").modal();
    //     $("#modal2").modal("open");
    //     return false;
    //   }
    // }
    // console.log("submitting for URLQuery: ", searchInput); //   fetchQueryURL(search);
    movieData(searchInput);
    return searchInput;
  }

  // console.log(movies);

  function predictiveSearch() {
    // console.log("search");

    var titles = [];
    $("#datalist").empty();
    for (var i = 0; i < movies.length; i++) {
      if (
        movies[i].toLowerCase().includes(
          $("#searchText")
            .val()
            .toLowerCase()
        )
      ) {
        titles.push(movies[i]);
      }
    }
    for (var j = 0; j < titles.length; j++) {
      var option = $("<option></option>").attr("value", titles[j]);

      $("#datalist").append(option);
    }
    titles = [];
  }

  var searchDebounced = _.debounce(predictiveSearch, 600);

  $("#searchText").keyup(function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      // console.log(event.keyCode);
      searchDebounced();
    }
  });
});
