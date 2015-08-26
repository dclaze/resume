angular.module('resume').service('googleAddressLookup', ['$q', function($q) {
    var mapCanvas = document.getElementById('international-map');
    if (window.google) {
        var mapOptions = {
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            streetViewControl: false,
            draggable: false,
            styles: simpleGrayThemeStyle
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }

    function getAddressComponent(location, componentName) {
        return location.address_components.filter(function(a) {
            return a.types.indexOf(componentName) != -1
        })[0];
    }

    function getLongNameAddressComponent(location, componentName) {
        var addressComponent = getAddressComponent(location, componentName);
        return addressComponent ? addressComponent["long_name"] : null;
    }

    function getShortNameAddressComponent(location, componentName) {
        var addressComponent = getAddressComponent(location, componentName);
        return addressComponent ? addressComponent["short_name"] : null;
    }

    function getStreetAddress(location) {
        var streetNumber = getLongNameAddressComponent(location, "street_number"),
            route = getLongNameAddressComponent(location, "route"),
            streetAddress = getLongNameAddressComponent(location, "street_address");
        return streetAddress ? streetAddress : [streetNumber, route].filter(function(c) {
            return c;
        }).join(' ');
    }

    function getCityName(location) {
        return getLongNameAddressComponent(location, "locality");
    }

    function getStateName(location) {
        return getShortNameAddressComponent(location, "administrative_area_level_1")
    }

    function getPostalCode(location) {
        return getLongNameAddressComponent(location, "postal_code");
    }

    function getLocationFromName(locationName) {
        var deferred = $q.defer();

        if (window.google) {
            var places = new google.maps.places.PlacesService(map);
            places.textSearch({
                query: locationName
            }, function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && results && results.length) {
                    places.getDetails({
                        placeId: results[0].place_id
                    }, function(location, b) {
                        if (status == google.maps.places.PlacesServiceStatus.OK && location) {
                            deferred.resolve({
                                address: getStreetAddress(location),
                                city: getCityName(location),
                                postalCode: [getStateName(location), getPostalCode(location)].join(" "),
                            });
                        }
                    });
                }
            });
        } else {
            deferred.reject("Google is not loaded.");
        }

        return deferred.promise;
    }

    this.getLocationFromName = getLocationFromName;
}]);
