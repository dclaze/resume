/*https://snazzymaps.com/style/24961/simple-dark-gray*/
var simpleGrayThemeStyle = [{
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#e3e3e3"
    }]
}, {
    "featureType": "landscape.natural",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#808285"
    }]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{
        "color": "#cccccc"
    }]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.station.airport",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.station.airport",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#FFFFFF"
    }]
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}];

function fitWorldMap(map) {
    var allowedBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(85, -180),
            new google.maps.LatLng(-85, 180)
        ),
        swt = allowedBounds.getSouthWest().lng(),
        nor = allowedBounds.getNorthEast().lat(),
        k = 5.0,
        n = allowedBounds.getNorthEast().lat() - k,
        e = allowedBounds.getNorthEast().lng() - k,
        s = allowedBounds.getSouthWest().lat() + k,
        w = allowedBounds.getSouthWest().lng() + k,
        neNew = new google.maps.LatLng(n, e),
        swNew = new google.maps.LatLng(s, w),
        boundsNew = new google.maps.LatLngBounds(swNew, neNew);

    map.fitBounds(boundsNew);
}


function initialize() {
    var mapCanvas = document.getElementById('international-map');
    var mapOptions = {
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
        styles: simpleGrayThemeStyle
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    fitWorldMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
