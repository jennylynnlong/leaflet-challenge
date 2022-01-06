// Adding the tile layer
var defaultMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// grayscale tile layer
var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

// water color layer
var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

// topography layer
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// make a basemaps object
var basemaps = {
    GrayScale: grayscale,
    Watercolor: waterColor,
    Topography: topo,
    Default: defaultMap
};

// Creating the map object
var myMap = L.map("map", {
    center: [37.0902, -115.7129],
    zoom: 4,
    layers: [defaultMap, grayscale, waterColor, topo]
});

// add the default map to the map
defaultMap.addTo(myMap);

// add the Layer control
L.control
    .layers(basemaps)
    .addTo(myMap);

/*
// Load the GeoJSON data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var geojson;

// Get the data with D3
d3.json(geoData).then(function(data) {

    var quakeArray = [];

    for (var i = 0, i < data.length, i++) {
        var location = data[i].
    }

});
*/

// data for tectonic plates and draw on the map
// variable to hold the tectonic plates layer
var tectonicPlates = new L.layerGroup();

// call the API to get info for tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    // console log
    console.log(plateData)
});