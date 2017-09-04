// Author :        Sheena Elveus
// Date   :        August 2017
// Description:    Main JavaScript file to add functionality for the application


//global variables
var map;
var defaultMapZoom = 16;
var infoWindow;
var estLocations = [];

var initial_locations = [
	{
		name: 'The Spotted Pig', 
		lat: 40.7356379,
		lng: -74.0067303
	},
	{
		name: 'Frankies 570 Spuntino', 
		lat: 40.735728,
		lng: -74.0057962
	},
	{
		name: 'Red Farm', 
		lat: 40.7342524, 
		lng: -74.0065311
	},
	{
		name: 'Employees Only', 
		lat: 40.7334417, 
		lng: -74.0062061
	},
	{	
		name: 'I Sodi', 
		lat: 40.7333567, 
		lng: -74.002937
	},
	{
		name: 'Village Vanguard', 
		lat: 40.7348037, 
		lng: -74.0020573
	},
	{
		name: 'The Meatball Shop', 
		lat: 40.7348037, 
		lng: -74.0020573
	},
	{
		name: 'Rosemary\'s', 
		lat: 40.7348037, 
		lng: -74.0020573
	},
	{
		name: 'Smalls Jazz Club', 
		lat: 40.7348478, 
		lng: -74.0040195
	},
	{
		name: 'Sant Ambroeus West Village', 
		lat: 40.7354067, 
		lng: -74.0053231
	},
	{
		name: 'Fat Cat', 
		lat: 40.7336423, 
		lng: -74.0055136
	},
	{
		name: 'Trattoria Spaghetto', 
		lat: 40.730195, 
		lng: -74.004747
	},
	{
		name: 'Tue Thai Food', 
		lat: 40.7338706, 
		lng: -74.0020651
	},
	{
		name: 'Murray\'s Cheese Bar', 
		lat: 40.731219, 
		lng: -74.0053527
	},
	{
		name: 'Blue Ribbon Downing Street Bar', 
		lat: 40.7293964, 
		lng: -74.0059948
	},
	{
		name: 'Panchito\'s', 
		lat: 40.7319719, 
		lng: -74.003847
	},
	{
		name: 'Tio Pepe', 
		lat: 40.7319719, 
		lng: -74.003847
	},
	{
		name: 'Onegin', 
		lat: 40.7333096, 
		lng: -74.0021874
	},
	{
		name: 'Blue Hill', 
		lat: 40.7320505, 
		lng: -74.0018572
	},
	{
		name: 'Amelie Wine Bar', 
		lat: 40.7326327, 
		lng: -73.9998563
	},
	{
		name: 'Le Souk Restaurant and Lounge', 
		lat: 40.7290277, 
		lng: -73.9994999
	},
	{
		name: 'OTTO Enoteca e Pizzeria', 
		lat: 40.732143, 
		lng: -74.0034087
	},
	{
		name: 'Gotham Bar and Grill', 
		lat: 40.7330698, 
		lng:-74.0030225
	},
	{
		name: 'Strip House Speakeasy', 
		lat: 40.7330698, 
		lng: -74.0030225
	},
	{
		name: 'Carbone', 
		lat: 40.7313299, 
		lng: -74.0048883
	}
];




function initMap(){

	//create styles for map
	var styles = [
		{
			featureType: 'water',
			stylers: [
				{ color: '#19a0d8' }
			]
		},
		{
			featureType: 'administrative',
			elementType: 'labels.text.stroke',
			stylers: [
				{ color: '#ffffff' },
				{ weight: 6 }
			]
		},

		{
			featureType: 'administrative',
			elementType: 'labels.text.fill',
			stylers: [
				{ color: '#e85113' }
			]
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [
				{ color: '#efe9e4' },
				{ lightness: -40 }
			]
		},
		{
			featureType: 'transit.station',
			stylers: [
				{ weight: 9 },
				{ hue: '#e81195' }
			]
		},
		{
			featureType: 'transit.station.bus',
			stylers: [
				{ weight: 9 },
				{ hue: '#058dfc' }
			]
		},
		{
			featureType: 'transit.line',
			stylers: [
				{ color: '#75339b' }
			]
		},
		{
			featureType: 'water',
			elementType: 'labels.text.stroke',
			stylers: [
				{ lightness: 100 }
			]
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#21a506' }, 
				
			]
		},
		{
			featureType: 'road.local',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#fcca05' },
				{ lightness: -25 }
			]
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#f1bd81' },
				{ lightness: -25 }
			]
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#efe9e4' },
				{ lightness: -25 }
			]
		}
	];

	//set center of maps
	var center = new google.maps.LatLng(40.7316537, -74.0034928);

	//create map
	map = new google.maps.Map(document.getElementById('map-div'), {
		center: center,
		zoom: defaultMapZoom,
		styles: styles,
		mapTypeControl: false
	});

} 





var Location = function(data){
	this.name = data.name;
	this.lat = data.lat;
	this.lng = data.lng;
	this.address = null;
	this.marker = null;
	this.favorited = false; 
};


//create knockout view model
var ViewModel = function(data){

	var self = this;

	//turn nearby locations into markers
	initial_locations.forEach(function(locale){
		estLocations.push( new Location(locale) );
	});
	

	this.makeMarkerIcon = function(markerColor){
		var markerImage = new google.maps.MarkerImage(
			'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
			new google.maps.Size(21, 34),
			new google.maps.Point(0, 0),
			new google.maps.Point(10, 34),
			new google.maps.Size(21,34));

		return markerImage;
	};

	//create all markers
	var defaultMarker = self.makeMarkerIcon('0091ff');
	var highlightedMarker = self.makeMarkerIcon('FFFF24');
	var clickedMarker = self.makeMarkerIcon('EF0711');
	var largeInfoWindow = new google.maps.InfoWindow();

	estLocations.forEach(function(locale){
		
		locale.marker = new google.maps.Marker({
			position: new google.maps.LatLng(locale.lat, locale.lng),
			map: map,
			animation: google.maps.Animation.DROP,
			title: locale.name,
			icon: defaultMarker,
		});


		//### add marker specific listeners ###
		//populate marker info window
		google.maps.event.addListener(locale.marker, 'click', function(){
			map.setCenter(locale.marker.position);
			map.setZoom(19);
			locale.marker.setIcon(clickedMarker);
			locale.marker.setAnimation(google.maps.Animation.BOUNCE);

			setTimeout(function(){
				locale.marker.setAnimation(null);
				locale.marker.setIcon(defaultMarker);
			}, 5500);
			
			
			self.showModalInfo(locale);
			self.populateInfoWindow(this, largeInfoWindow);
		});
		
		// //change marker to yellow when its hovered over
		google.maps.event.addListener(locale.marker, 'mouseover', function(){
			this.setIcon(highlightedMarker);
		});

		// //change marker color to default when its no longer hovered over
		google.maps.event.addListener(locale.marker, 'mouseout', function(){
			this.setIcon(defaultMarker);
		});
	});


	//show all markers on map
	this.showLocations = function(){
		var bounds = new google.maps.LatLngBounds();

		estLocations.forEach(function(locale){
			locale.marker.setMap(map);
			bounds.extend(locale.marker.position);
		});

		map.fitBounds(bounds);
	};


	//hide all markers on map
	this.hideLocations = function(){
		estLocations.forEach(function(locale){
			locale.marker.setMap(null);
		});
	};

	this.shouldShowLocales = ko.observable(true);
	
	//show filtered listings on smaller screen
	this.showFltrResults = function(){
		self.shouldShowLocales(true);
	};


	//hide filtered listings on smaller screen
	this.hideFltrResults = function(){
		self.shouldShowLocales(false);
	};


	//create an infowindow on a marker
	this.populateInfoWindow = function(marker, infowindow){
		//check to make sure infowindow is not already opened on this marker.
		if (infowindow.marker != marker) {

			infowindow.setContent('');
			infowindow.marker = marker;

			// verify marker is cleared when infowindow is closed
			infowindow.addListener('closeclick',function(){
				infowindow.setMarker = null;
			});

			//use geocoding to get actual address from lat long 
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'location': marker.position}, function(results, status){

				if(status == google.maps.StreetViewStatus.OK){

					if (results[0]) {
						var string_addr = results[0].formatted_address;		
						var streetViewService = new google.maps.StreetViewService();
						var radius = 50;
						
						//Use streetview service to get the closest streetview image within 50 meters of the markers position
						streetViewService.getPanoramaByLocation(marker.position, radius, function(data, status){
							if (status == google.maps.StreetViewStatus.OK) {
								var nearStreetViewLocation = data.location.latLng;
								
								var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);

								//create info window of address and pano pic
								infowindow.setContent('<div><br><b>' + marker.title + '</b><br>' + string_addr + '<br><br>' + '<div id="pano"></div><br></div>');

								var panoramaOptions = {
									position: nearStreetViewLocation,
									pov: {
										heading: heading,
										pitch: 30
									}
								};
								var panorama = new google.maps.StreetViewPanorama(
									document.getElementById('pano'), panoramaOptions);
							} 
							else {
								infowindow.setContent('<div>No Street View Found</div>');
							}						
						});

					}
				} else{
					infowindow.setContent('<div>' + marker.title + '</div>' +
					'<div>Unable to retrieve address from location!</div>');
				}

			});
			
			//open infowindow on the correct marker.
			infowindow.open(map, marker);
		}
	};


	//show marker info when list item is clicked
	this.showMarkerFromList = function(locale){
		map.setCenter(locale.marker.position);
		map.setZoom(19);
		locale.marker.setAnimation(google.maps.Animation.BOUNCE);
		locale.marker.setIcon(clickedMarker);

		setTimeout(function(){
			locale.marker.setAnimation(null);
			locale.marker.setIcon(defaultMarker);
		}, 3500);

		self.populateInfoWindow(locale.marker, largeInfoWindow);
		self.showModalInfo(locale);
	};


	//show extra info when marker is double clicked
	this.showModalInfo = function(locale){

		//perform foursquare query
		var client_id = '&client_id=OLB4SM5D430EVMACY2BY2Z3HCWD2GTV5FHXJ1TQVENOBQM2P'; 
		var client_secret = '&client_secret=IJKRVN3SEISSBNT3OOMJX022TWRNBTM5HY404OZ4XI3FNNIS';
		var v = '&v=20170822';
		var req = 'https://api.foursquare.com/v2/venues/search?';
		var foursquareContent = '';

		//perform request to foursquare
		$.ajax({

			url: req + 'll=' + locale.lat + ',' + locale.lng + 
				'&query=' + locale.name + client_id + 
				client_secret + v,
			dataType: "json"

		}).done(function(data){
			
			if(data.response.venues[0]){
				var venue = data.response.venues[0];
				var category = [];
				var addr = ''; 
				var phone = '';
				var twitter = ''; 
				var fb = '';
				var venueUrl = '';

				if(venue.categories){
					for(var i=0; i<venue.categories.length; i++){
						category.push( venue.categories[i].shortName );
					}
				}

				//if location exists, give formmated address; otherwise, error
				addr = (venue.location) ? (venue.location.formattedAddress[0] + 
					', ' + venue.location.formattedAddress[1] + 
					', ' + venue.location.formattedAddress[2]) : ("No address at this time."); 

				if(venue.contact){
					phone = (venue.contact.formattedPhone) ? (venue.contact.formattedPhone) : ("No phone at this time."); 
					twitter = (venue.contact.twitter) ? (venue.contact.twitter) : ("No Twitter handle at this time."); 
					fb = (venue.contact.facebookUsername) ? (venue.contact.facebookUsername) : ("No Facebook handle at this time."); 
				}

				venueUrl = (venue.url) ? (venue.url) : ("No url at this time.");

				foursquareContent += '<b>Type(s)</b> : ' + category + 
				'<br><br>' + '<b>Address : </b>' + addr + 
				'<br><br>' + '<b>Phone : </b>' + phone + 
				'<br><br>' + '<b>URL : </b>' + venueUrl + 
				'<br><br>' + '<b>Twitter </b>: ' + twitter + 
				'<br><br>' + '<b>Facebook </b>: ' +fb ;


				$.sweetModal({
					title: locale.name,
					content: foursquareContent, 
					theme: $.sweetModal.THEME_DARK
				});

			}

		}).fail(function(){
			foursquareContent = 'Oops! Failed to get info from foursquare!';

			$.sweetModal({
				title: locale.name,
				content: foursquareContent, 
				theme: $.sweetModal.THEME_DARK
			});
		});
	};

	//filter thru locales
	this.filtered_locations = ko.observableArray([]);
	this.input = ko.observable('');
	
	estLocations.forEach(function(locale){
		self.filtered_locations.push(locale);
	});
	
	this.filter = function(){

		var userInput = self.input();

		self.filtered_locations.removeAll();
		estLocations.forEach(function(locale){
			locale.marker.setVisible(false);

			if(locale.name.toLowerCase().indexOf(userInput) !== -1){
				self.filtered_locations.push(locale);
			}
		});

		self.filtered_locations().forEach(function(locale){
			locale.marker.setVisible(true);
		});
	};
};


function mapError(){
	alert('Google Maps is unable to load. Check your internet connection.');
}

function ajaxError(){
	alert('Unable to perform request. Check your internet connection.');
}

function initialize(){
	initMap();
	var mvvm = new ViewModel(); 
	ko.applyBindings(mvvm);
}
