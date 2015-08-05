var app = {};
app.clientId = "RUPFMKH0N5PWTIS43LH20C1AWZCMSRJOF02L1Q0PBXEVXIR0";
app.clientSecret = "YRFJZOCG0J3RAJCLGTTAPORHLNBHRNO0X0DSBTBRNA21HMFS";

//The mapping a midpoint feature below.

// var features = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Point",
//         "coordinates": [-97.522259, 35.4691]
//       }
//     }, {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Point",
//         "coordinates": [-97.502754, 35.463455]
//       }
//     }
//   ]
// };

// var centerPt = turf.center(features);
// centerPt.properties['marker-size'] = 'large';
// centerPt.properties['marker-color'] = '#000';

// var resultFeatures = features.features.concat(centerPt);
// var result = {
//   "type": "FeatureCollection",
//   "features": resultFeatures
// };

L.mapbox.accessToken = "pk.eyJ1IjoicmJuaG1sbCIsImEiOiI3NjY4ZDk5NjFhMTYyMDMxMWFmMmM5YWEzMzlkMDgwZiJ9.Ep7u1zX_6SFI94jPki9O-w";
L.mapbox.map('map', 'mapbox.streets')
    .addControl(L.mapbox.geocoderControl('mapbox.places'));

app.getGeocode = function() {
	var mapBoxKey = "pk.eyJ1IjoicmJuaG1sbCIsImEiOiI3NjY4ZDk5NjFhMTYyMDMxMWFmMmM5YWEzMzlkMDgwZiJ9.Ep7u1zX_6SFI94jPki9O-w"
	$.ajax({
		url: "http://api.mapbox.com/v4/geocode/mapbox.places",
		type: "GET",
		dataType: "json",
		data: {
			query: "154 Sorauren Avenue",
			access_token: mapBoxKey,
			format: "json"
		},
		success: function() {
			//2. Pass this info to a display art function.
			// console.log("YES");
			

		}
	});
};


//1. Get a list of venues from 4S.
app.getVenues = function() {
	$.ajax({
		url: "https://api.foursquare.com/v2/venues/explore",
		type: "GET",
		dataType: "json",
		data: {
			ll: "43.648622,-79.397335",
			client_id: "RUPFMKH0N5PWTIS43LH20C1AWZCMSRJOF02L1Q0PBXEVXIR0",
			client_secret: "YRFJZOCG0J3RAJCLGTTAPORHLNBHRNO0X0DSBTBRNA21HMFS",
			v: 20150722,
			radius: 500,
			section: "coffee",
			openNow: 1,
			query: "coffee",
			limit: 10,
			sortByDistance: 1,
			format: "json"
		},
		success: function(venues) {
			//2. Pass this info to a display art function.
			var localVenues = venues.response.groups[0].items;
			console.log(localVenues);
			app.displayVenues(localVenues);

		}
	});
};
// //3. build our html to display on the page.
app.displayVenues = function(localVenues) {
		// 
		// console.log(localVenues[i].venue.name);
		// $(".resultsContainer").empty();

// 	$.each(artWork, function(index, item) {
// 		if (item.hasImage) {
// 			//Creating a new element with jQuery.
// 			// When we pass <tagname> into $ it will create a new element for us.
// 			var $pieceContainer = $("<div>");
// 			//Add a class to the new container with the addClass method.
// 			$pieceContainer.addClass("piece");
// 			// using the same technique, we create a new h3 element.
// 			var $title = $("<h3>");
// 			// The H3 is empty, so we use the .text method to put text in it based on the current object.
// 			$title.text(item.title);
// 			// Again suing the technique of passing a <img> into $, we crate an empty image element.
// 			var $artImage = $("<img>");
// 			// Then, using the .attr (attribute) method, we set the source of the new empty image to be the image stored in our object.
// 			$artImage.attr("src", item.webImage.url);
// 			//We then append the title into our empty div with a class of piece so it is no longer empty.
// 			// If we pass any number of arguments to the append method, it will append the, in that order.

// 			var $artistName = $("<p>");
// 			$artistName.addClass("artist").text(item.principalOrFirstMaker);

// 			$pieceContainer.append($title, $artistName, $artImage);
// 			//Select the artwork container that is ON the html page, so we can place our new element there.
// 			$("#artwork").append($pieceContainer);
// 		}
// 	});
};
// //4. (optional) allow user to search for art.

// app.searchLocations = function() {
// 	$("header form").on("submit", function(evnt){
// 		evnt.preventDefault();
// 		var searchQuery = $(".query").val();
// 		app.getArt(searchQuery);
// 	});
// };

app.init = function() {
	app.getVenues();
	app.getGeocode();
	// app.searchLocations();
};

$(function(){
	app.init();
});