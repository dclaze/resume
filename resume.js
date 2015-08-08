angular.module('resume').service('Resume', ['$resource', '$http', function($resource, $http) {
    var jsonBinUrl = 'https://api.myjson.com/bins/';
    var resume = $resource(jsonBinUrl + ':id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    var originalSave = resume.prototype.$save;
    resume.prototype.$save = function(cb) {
        var resumeInstance = this;
        if (resumeInstance.id)
            return originalSave.apply(this, arguments);

        $http.post(jsonBinUrl, resumeInstance)
            .success(function(response) {
                resumeInstance.id = response.uri.split('/').pop();
                $http.put(jsonBinUrl + resumeInstance.id, resumeInstance)
                    .success(function(response) {
                        if (cb)
                            cb(resumeInstance);
                    })
                    .error(function() {
                        if (cb)
                            cb(arguments);
                    })
            }).error(function() {
                if (cb)
                    cb(arguments);
            });

        return resumeInstance;
    };

    return resume;
}]);
