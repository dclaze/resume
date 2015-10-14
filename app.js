angular.module('resume', ['ngResource', 'ngDialog', 'ngRoute', 'youtube-embed']);

angular.module('resume').constant('WorkColors', ["#343338", "#146ea3"]);

angular.module('resume').constant('EducationColors', ["#d2232a", "#00aeef", "#41ad49"]);

angular.module('resume').constant('EducationIcons', {
    fromColor: function(hexColor) {
        switch (hexColor) {
            case "#d2232a":
                return "icons/ribbon-red.png";
                break;
            case "#00aeef":
                return "icons/ribbon-blue.png";
                break;
            case "#41ad49":
                return "icons/ribbon-green.png";
                break;
        }

        return "icons/ribbon-blue.png";
    }
});

angular.module('resume').filter('educationRibbon', ['EducationIcons', function(EducationIcons) {
    return function(color) {
        return EducationIcons.fromColor(color);
    };
}]);

angular.module('resume').directive('workSummary', function() {
    return {
        scope: {
            summary: "=workSummary"
        },
        template: "<p data-ng-repeat='s in summaries'>{{s}}</p>",
        controller: ['$scope', function($scope) {
            $scope.$watch('summary', function(summary) {
                if (summary) {
                    $scope.summaries = summary.split(/☛/);
                }
            });
        }]
    }
});

angular.module('resume').service('schema', ['WorkColors', 'EducationColors', function(WorkColors, EducationColors) {
    function getNewResumeSchema() {
        var newSchema = {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "title": "Resume Schema",
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "basics": {
                    "type": "object",
                    "additionalProperties": true,
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "label": {
                            "type": "string",
                            "description": "e.g. Web Developer"
                        },
                        "picture": {
                            "type": "string",
                            "description": "URL (as per RFC 3986) to a picture in JPEG or PNG format"
                        },
                        "email": {
                            "type": "string",
                            "description": "e.g. thomas@gmail.com",
                            "format": "email"
                        },
                        "phone": {
                            "type": "string",
                            "description": "Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923"
                        },
                        "website": {
                            "type": "string",
                            "description": "URL (as per RFC 3986) to your website, e.g. personal homepage",
                            "format": "uri"
                        },
                        "summary": {
                            "type": "string",
                            "description": "Write a short 2-3 sentence biography about yourself"
                        },
                        "location": {
                            "type": "object",
                            "additionalProperties": true,
                            "properties": {
                                "address": {
                                    "type": "string",
                                    "description": "To add multiple address lines, use \n. For example, 1234 Glücklichkeit Straße\nHinterhaus 5. Etage li."
                                },
                                "postalCode": {
                                    "type": "string"
                                },
                                "city": {
                                    "type": "string"
                                },
                                "countryCode": {
                                    "type": "string",
                                    "description": "code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN"
                                },
                                "region": {
                                    "type": "string",
                                    "description": "The general region where you live. Can be a US state, or a province, for instance."
                                }
                            }
                        },
                        "profiles": {
                            "type": "array",
                            "description": "Specify any number of social networks that you participate in",
                            "additionalItems": false,
                            "items": {
                                "type": "object",
                                "additionalProperties": true,
                                "properties": {
                                    "network": {
                                        "type": "string",
                                        "description": "e.g. Facebook or Twitter"
                                    },
                                    "username": {
                                        "type": "string",
                                        "description": "e.g. neutralthoughts"
                                    },
                                    "url": {
                                        "type": "string",
                                        "description": "e.g. http://twitter.com/neutralthoughts"
                                    }
                                }
                            }
                        }
                    }
                },
                "work": {
                    "type": "array",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "company": {
                                "type": "string",
                                "description": "e.g. Facebook"
                            },
                            "position": {
                                "type": "string",
                                "description": "e.g. Software Engineer"
                            },
                            "website": {
                                "type": "string",
                                "description": "e.g. http://facebook.com",
                                "format": "uri"
                            },
                            "startDate": {
                                "type": "string",
                                "description": "resume.json uses the ISO 8601 date standard e.g. 2014-06-29",
                                "format": "date"
                            },
                            "endDate": {
                                "type": "string",
                                "description": "e.g. 2012-06-29",
                                "format": "date"
                            },
                            "summary": {
                                "type": "string",
                                "description": "Give an overview of your responsibilities at the company"
                            },
                            "highlights": {
                                "type": "array",
                                "description": "Specify multiple accomplishments",
                                "additionalItems": false,
                                "items": {
                                    "type": "string",
                                    "description": "e.g. Increased profits by 20% from 2011-2012 through viral advertising"
                                }
                            }
                        }

                    }
                },
                "volunteer": {
                    "type": "array",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "organization": {
                                "type": "string",
                                "description": "e.g. Facebook"
                            },
                            "position": {
                                "type": "string",
                                "description": "e.g. Software Engineer"
                            },
                            "website": {
                                "type": "string",
                                "description": "e.g. http://facebook.com",
                                "format": "uri"
                            },
                            "startDate": {
                                "type": "string",
                                "description": "resume.json uses the ISO 8601 date standard e.g. 2014-06-29",
                                "format": "date"
                            },
                            "endDate": {
                                "type": "string",
                                "description": "e.g. 2012-06-29",
                                "format": "date"
                            },
                            "summary": {
                                "type": "string",
                                "description": "Give an overview of your responsibilities at the company"
                            },
                            "highlights": {
                                "type": "array",
                                "description": "Specify multiple accomplishments",
                                "additionalItems": false,
                                "items": {
                                    "type": "string",
                                    "description": "e.g. Increased profits by 20% from 2011-2012 through viral advertising"
                                }
                            }
                        }

                    }
                },
                "education": {
                    "type": "array",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "institution": {
                                "type": "string",
                                "description": "e.g. Massachusetts Institute of Technology"
                            },
                            "area": {
                                "type": "string",
                                "description": "e.g. Arts"
                            },
                            "studyType": {
                                "type": "string",
                                "description": "e.g. Bachelor"
                            },
                            "startDate": {
                                "type": "string",
                                "description": "e.g. 2014-06-29",
                                "format": "date"
                            },
                            "endDate": {
                                "type": "string",
                                "description": "e.g. 2012-06-29",
                                "format": "date"
                            },
                            "gpa": {
                                "type": "string",
                                "description": "grade point average, e.g. 3.67/4.0"
                            },
                            "courses": {
                                "type": "array",
                                "description": "List notable courses/subjects",
                                "additionalItems": false,
                                "items": {
                                    "type": "string",
                                    "description": "e.g. H1302 - Introduction to American history"
                                }
                            }
                        }


                    }
                },
                "awards": {
                    "type": "array",
                    "description": "Specify any awards you have received throughout your professional career",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "title": {
                                "type": "string",
                                "description": "e.g. One of the 100 greatest minds of the century"
                            },
                            "date": {
                                "type": "string",
                                "description": "e.g. 1989-06-12",
                                "format": "date"
                            },
                            "awarder": {
                                "type": "string",
                                "description": "e.g. Time Magazine"
                            },
                            "summary": {
                                "type": "string",
                                "description": "e.g. Received for my work with Quantum Physics"
                            }
                        }
                    }
                },
                "publications": {
                    "type": "array",
                    "description": "Specify your publications through your career",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "e.g. The World Wide Web"
                            },
                            "publisher": {
                                "type": "string",
                                "description": "e.g. IEEE, Computer Magazine"
                            },
                            "releaseDate": {
                                "type": "string",
                                "description": "e.g. 1990-08-01"
                            },
                            "website": {
                                "type": "string",
                                "description": "e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html"
                            },
                            "summary": {
                                "type": "string",
                                "description": "Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML."
                            }
                        }
                    }
                },
                "skills": {
                    "type": "array",
                    "description": "List out your professional skill-set",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "e.g. Web Development"
                            },
                            "level": {
                                "type": "string",
                                "description": "e.g. Master"
                            },
                            "keywords": {
                                "type": "array",
                                "description": "List some keywords pertaining to this skill",
                                "additionalItems": false,
                                "items": {
                                    "type": "string",
                                    "description": "e.g. HTML"
                                }
                            }
                        }
                    }
                },
                "languages": {
                    "type": "array",
                    "description": "List any other languages you speak",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "language": {
                                "type": "string",
                                "description": "e.g. English, Spanish"
                            },
                            "fluency": {
                                "type": "string",
                                "description": "e.g. Fluent, Beginner"
                            }
                        }
                    }
                },
                "interests": {
                    "type": "array",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "e.g. Philosophy"
                            },
                            "keywords": {
                                "type": "array",
                                "additionalItems": false,
                                "items": {
                                    "type": "string",
                                    "description": "e.g. Friedrich Nietzsche"
                                }
                            }
                        }

                    }
                },
                "references": {
                    "type": "array",
                    "description": "List references you have received",
                    "additionalItems": false,
                    "items": {
                        "type": "object",
                        "additionalProperties": true,
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "e.g. Timothy Cook"
                            },
                            "reference": {
                                "type": "string",
                                "description": "e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing."
                            }
                        }
                    }
                }
            }
        };
        includeColorsInResumeSchema(newSchema);
        includeLinkedProfileUrlInResumeSchema(newSchema);
        includeDescriptors(newSchema);
        includeProjects(newSchema);

        return newSchema;
    }

    function includeColorsInResumeSchema(schema) {
        schema["properties"]["work"]["items"]["properties"]["color"] = {
            type: "string",
            enum: WorkColors
        };
        schema["properties"]["education"]["items"]["properties"]["color"] = {
            type: "string",
            enum: EducationColors
        };
    }

    function includeLinkedProfileUrlInResumeSchema(schema) {
        schema["properties"]["linkedIn"] = {
            "type": "object",
            "additionalProperties": true,
            "properties": {
                "profileUrl": {
                    "type": "string"
                }
            }
        };
    }

    function includeDescriptors(schema) {
        schema["properties"]["descriptors"] = {
            "type": "array",
            "description": "Descriptors",
            "additionalItems": true,
            "items": {
                "type": "string",
                "description": "e.g. Magestic"
            }
        };
    }

    function includeProjects(schema) {
        schema["properties"]["projects"] = {
            "type": "array",
            "description": "Descriptors",
            "additionalItems": true,
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            }
        };
    }

    this.new = getNewResumeSchema;
}]);

angular.module('resume').service('sampleResume', ['$http', 'WorkColors', 'EducationColors', function($http, WorkColors, EducationColors) {
    function addWorkColors(resume) {
        var colorIndex = 0;
        resume.work.forEach(function(w) {
            w.color = WorkColors[colorIndex % WorkColors.length];
            colorIndex++;
        });
    }

    function addEducationColors(resume) {
        var colorIndex = 0;
        resume.education.forEach(function(e) {
            e.color = EducationColors[colorIndex % EducationColors.length];
            colorIndex++;
        });
    }

    function addRandomDescriptors(resume) {
        resume.descriptors = ["Fun", "Inspired", "Energetic", "Honest", "Resourceful", "Innovative", "Creative", "Curious", "Inventor"];
    }

    function addRandomInterests(resume) {
        var interests = ["NASA", "Quadcopters", "Running", "Raspberry Pi", "Hackathons", "Traveling", "DIY", "Eating", "Robots"];
        resume.interests = interests.map(function(i) {
            return {
                name: i
            }
        });
    }

    function getSampleResume() {
        return $http.get('sample.json')
            .then(function(response) {
                var resume = response.data;
                addWorkColors(resume);
                addEducationColors(resume);
                addRandomInterests(resume);
                addRandomDescriptors(resume);
                return resume;
            });
    }
    this.new = getSampleResume;
}]);

angular.module('resume').directive('longAddress', function() {
    return {
        scope: {
            location: "=longAddress"
        },
        template: "<span>{{location.address}}</span> <span>{{location.city}} {{location.postalCode}}</span>"
    }
});

angular.module('resume').directive('shortAddress', function() {
    return {
        scope: {
            location: "=shortAddress"
        },
        template: "<span>{{location.city}} {{location.postalCode.split(' ')[0]}}</span>"
    }
});

angular.module('resume').directive('major', function() {
    return {
        scope: {
            major: "=major"
        },
        template: "<div data-ng-bind-html='majorHtml'></div>",
        controller: ['$scope', '$sce', function($scope, $sce) {
            function getMultilineMajor(major) {
                var formattedMajor = major;
                if (major && major.indexOf(',') != -1)
                    formattedMajor = major.replace(",", "</br>");
                return $sce.trustAsHtml(formattedMajor);
            }

            $scope.$watch('major', function(m) {
                $scope.majorHtml = getMultilineMajor(m);
            });
        }]
    }
});

angular.module('resume').filter('googleMapsUrl', function() {
    return function(location) {
        if (!location) return;
        return "https://maps.google.com/?q=" + [location.address, location.city, location.postalCode].join(" ");
    }
});

angular.module('resume').filter('linkedInProfession', function() {
    return function(linkedInLabel) {
        if (linkedInLabel && linkedInLabel.indexOf(' at') != -1)
            return linkedInLabel.split(' at')[0];
        return linkedInLabel;
    }
});

angular.module('resume').controller('Main', ['$scope', 'Resume', 'ngDialog', 'schema', 'googleAddressLookup', 'WorkColors', 'EducationColors', '$location', 'sampleResume', '$rootScope', function($scope, Resume, ngDialog, schema, googleAddressLookup, WorkColors, EducationColors, $location, sampleResume, $rootScope) {
    $scope.resume = Resume.get({
        id: $location.search().profile || "_no_id_"
    }, function(r) {
        addWorkLocations(r);
        addEducationLocations(r);
    }, function() {
        sampleResume.new().then(function(r) {
            $scope.resume = new Resume(r);
            addWorkLocations($scope.resume);
            addEducationLocations($scope.resume);
        });
    });

    $scope.$watch('resume', function(r) {
        if (r && r.id) {
            $location.search({
                profile: r.id
            });
        }
        $rootScope.title = r.basics && r.basics.name;
    }, true);

    function addWorkLocations(resume) {
        resume.work.forEach(function(workItem) {
            if (workItem.company)
                googleAddressLookup.getLocationFromName(workItem.company).then(function(location) {
                    workItem.location = location;
                });
        });
    }

    function addEducationLocations(resume) {
        for (var i = 0; i < resume.education.length; i++) {
            var educationItem = resume.education[i];
            if (educationItem.institution)
                googleAddressLookup.getLocationFromName(educationItem.institution).then(function(location) {
                    educationItem.location = location;
                });
        }
    }

    $scope.open = function() {
        var cloneOfResume = $scope.resume.isNew() ? undefined : angular.copy($scope.resume);
        ngDialog.open({
            template: '<div md-theme="docs-dark"><button data-ng-click="getLinkedInResume(editor)">Load from LinkedIn</button><button data-ng-click="onSave(editor, existingId)">Save</button><div id="resume-editor"></div></div>',
            plain: true,
            scope: $scope,
            closeByDocument: false,
            controller: ['$scope', '$element', function($scope, $element) {
                var resumeEditorDiv = $element[0].querySelector('.ngdialog-content');
                var options = {
                    schema: schema.new(),
                    disable_edit_json: true,
                    disable_properties: true,
                    collapsed: true,
                };
                if (cloneOfResume)
                    options.startval = cloneOfResume;

                $scope.editor = new JSONEditor(resumeEditorDiv, options);
                $scope.existingId = cloneOfResume && cloneOfResume.id;
            }],
            className: 'ngdialog-theme-default modal docs-dark'
        });
    };

    $scope.getLinkedInResume = function(editor) {
        // var onLinkedInAuth = function onLinkedInAuth() {
        IN.API.Profile('me').fields('firstName', 'lastName', 'headline', 'picture-url', 'summary', 'specialties', 'positions', 'email-address', 'languages', 'skills', 'educations', 'location:(name,country)', 'recommendations-received', 'phone-numbers', 'volunteer', 'publications', 'honors-awards', 'public-profile-url', 'projects').result(function(data) {
            var profile = data.values[0];
            var resume = new LinkedInToJsonResume().process(profile);
            resume.linkedIn = {
                profileUrl: profile.publicProfileUrl
            };
            editor.setValue(resume);
        });
        // };

        // IN.Event.on(IN, 'auth', onLinkedInAuth);
    };

    $scope.onSave = function(editor, existingId) {
        var newResume = editor.getValue();
        newResume.id = existingId;
        $scope.resume = new Resume(newResume);
        $scope.resume.isNew() ? $scope.resume.$save() : $scope.resume.$update();
    }
}]);

angular.module('resume').filter('firstName', function() {
    return function(name) {
        return name && name.split(' ').shift();
    }
});

angular.module('resume').filter('lastName', function() {
    return function(name) {
        return name && name.split(' ').pop();
    }
});

angular.module('resume').filter('website', function() {
    return function(website) {
        if (website && !website.match(/^[a-zA-Z]+:\/\//)) {
            return 'http://' + website;
        }
        return website;
    }
});
