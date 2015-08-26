angular.module('resume').filter('firstName', function(){
	return function(name){
		return name.split(' ').shift();
	}
});