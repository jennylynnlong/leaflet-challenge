# Visualizing Data with Leaflet

## Details About the Challenge
This assignment was designed to challenge me to build a webpage to visualize the United States Geological Survey's (USGS) earthquake data using CSS, HTML, and JavaScript. 

## Level 1: Basic Visualization
1. Use the URL of the [USGS GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) of earthquakes from the past 7 days to pull in the data for the visualization.
   - ![image](https://user-images.githubusercontent.com/88349512/149835805-9cd9d8ca-607b-4f0e-8b8b-bab8baf6f612.png)

2. Import and Visualize the Data
   - Using Leaflet, create a map that plots all of the earthquakes from the data set based on their longitude and latitudes.
     - ![image](https://user-images.githubusercontent.com/88349512/149836581-9bdc7184-9527-4f6f-9111-9d1ffb39e19e.png)
   - Create data markers to reflect the magnitude of the earthquake by size (higher magnitudes with larger size) and the depth of the earthquake by color (deeper earthquakes with darker color).
     - ![image](https://user-images.githubusercontent.com/88349512/149836265-b31abeba-d826-4389-8a8b-aff705c0b802.png)
   - Add popups with additional information about each earthquake when clicked.
     - ![image](https://user-images.githubusercontent.com/88349512/149836369-c73974ca-74c8-4a2f-8296-75ad873afcc9.png)
   - Create a legend for the map
     - ![image](https://user-images.githubusercontent.com/88349512/149836474-dc1beb92-7ed3-44ed-878b-c76f40dce629.png)
       - ![image](https://user-images.githubusercontent.com/88349512/149836524-f43dad92-be1c-4a14-a794-190682a196db.png)

![image](https://user-images.githubusercontent.com/88349512/149836722-497cc24d-3f28-4c72-9aeb-c5d6ac5a5d30.png)

## Level 2: More Data
1. Plot a second data set on the map illustrating the relationship between [tectonic plates JSON information](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json) and seismic activity.
   - ![image](https://user-images.githubusercontent.com/88349512/149837131-644500e9-e369-49cf-a393-7d9b1381a2bf.png)

2. Add various base maps to choose from and separate the two different data sets into overlays that can be turned on and off.
   - ![image](https://user-images.githubusercontent.com/88349512/149837362-260bd07f-dd57-4cbb-b7e3-ef7cacba3472.png)
     - ![image](https://user-images.githubusercontent.com/88349512/149837402-65712158-db7e-41e7-a3b7-94a8a7ef2a25.png)

![image](https://user-images.githubusercontent.com/88349512/149837578-89cee396-74d2-4531-8e5d-69e848ffeaa3.png)

## How to Run the Code
1. Pull the files from this repository
2. Open the [index.html](/index.html) file to launch the web browser.
3. Alternatively, you can view the content by clicking [this link](https://jennylynnlong.github.io/leaflet-challenge/).
