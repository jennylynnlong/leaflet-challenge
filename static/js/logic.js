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

// data for tectonic plates and draw on the map
// variable to hold the tectonic plates layer
var tectonicPlates = new L.layerGroup();

// call the API to get info for tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    // console log
    //console.log(plateData)

    // load data using geoJSON and add to tectonic plates layer
    L.geoJson(plateData, {
        // add styling to see the lines
        color: "orange",
        weight: 1
    }).addTo(tectonicPlates);
});

// add tectonic plates to map
tectonicPlates.addTo(myMap);

// variable to hold earthquake data layer
let earthquakes = new L.layerGroup();

// get data for earthquakes and populate the layerGroup
// make a call to API for geoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(function(quakeData) {

    // console log
    //console.log(quakeData);
    
    // plot circles where the radius is dependent on the magnitude
    // and the color is dependent on the depth

    //make a function that chooses the color of datapoint
    function dataColor(depth){
        if (depth > 90)
            return "red";
        else if (depth > 70)
            return "#fc4903";
        else if (depth > 50)
            return "#fc8403";
        else if (depth > 30)
            return "#fcad03";
        else if (depth > 10)
            return "#cafc03";
        else
            return "#34eb34"
    }

    // make a function to determin the size of the radius
    function radiusSize(mag){
        // makes sure a 0 mag earthquake will show up
        if (mag == 0)
            return 1; 
        // makes sure the circle is pronounced in the map    
        else
            return mag * 5;
    }

    // add on to the style for each data point
    function dataStyle(feature){
        return {
            opacity: 1,
            fillOpacity: 0.5,
            fillColor: dataColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: radiusSize(feature.properties.mag),
            weight: 0.5,
            stroke: true
        }
    }

    // add the geoJSON data to earthquake layerGroup
    L.geoJson(quakeData, {
        // make each feature a circle marker that's on map
        pointToLayer: function(feature, latLng){
            return L.circleMarker(latLng);
        },
        // set the style for each marker by calling dataStyle function
        // which passes in quakeData
        style: dataStyle,
        // add popups
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                            Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                            Location: <b>${feature.properties.place}</b>`);
        }
    }).addTo(earthquakes)
});

// add the earthquake layer to map
earthquakes.addTo(myMap);

// add the legend to the map
let legend  = L.control({
    position: "bottomright"

});

// add the properties for the legend
legend.onAdd = function(){
    // make a div for the legend
    let div = L.DomUtil.create('div', 'info legend');

    // set up the intervals
    let intervals = [-10, 10, 30, 50, 70, 90];
    // set the colors for the intervals
    let colors = ["#34eb34", "#cafc03", "#fcad03", "#fc8403", "#fc4903", "red"];

    // loop through the intervals and colors and generate a label with a colored square for each interval
    for (var i = 0; i < intervals.length; i++){
        // Use innner html to set the quare for each interval and label

        div.innerHTML += "<i style=background:"
                + colors[i] 
                + "></i>"
                + intervals[i]
                + (intervals[i+1] ? "km&ndash;" + intervals[i+1] + "km" + "<br>" : "km+");
    }

    return div;
};

legend.addTo(myMap);

// add overlay for tectonic plates and for the earthquakes
let overlays = {
    "Tectonic Plates": tectonicPlates,
    "Earthquake Data": earthquakes
};

// add the Layer control
L.control
    .layers(basemaps, overlays)
    .addTo(myMap);