## CONTENTS OF THIS FILE
------------------------
* Introduction
* Requirements
* Installation / Usage
* Code Attributions
* Known Issues

### INTRODUCTION
----------------
This is a single page application that uses the Google API to feature the various restaurants and cafés in the neighborhood of Greenwich Village in New York City, NY. A user can:
- view the current listing of restaurants
- get restaurant info from the popular site FourSquare
- use a filtering system to quickly find a locale


### REQUIREMENTS
----------------
You have a web browser with access to the internet. 


### INSTALLATION / USAGE
------------------------
To run online, click the index.html. This will open the application in your designated browser. 

When running the application:
- click 'Show Restaurants' to view markers of all the locations in the area and click 'Hide Restaurants' to hide all the markers.
- start typing in the filter text box to find a particular restaurant
- click on a restaurant's name in the list to see its corresponing marker
- click on a marker to see the information of a locale


### CODE ATTRIBUTIONS
----------------------
- Map info is all attributed to the Google Maps / Places API.

- Restauant info is retrieved using the FourSquare API.

- Code used to create the modal and its effects are from the SweetModal API (http://sweet-modal.adepto.as/). 


### KNOWN ISSUES
---------------- 
1) Due to the zoom level, markers may not be absolutely precise.

2) There can be some lag time with the color change of the markers when they are clicked.

3) The show / hide filtered results can still impact the listings div even when those buttons are no longer visibles.