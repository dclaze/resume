angular.module('resume').directive('timeline', ['EducationIcons', '$anchorScroll', function(EducationIcons, $anchorScroll) {
    return {
        scope: {
            resume: "=timeline"
        },
        controller: ['$scope', '$element', function($scope, $element) {
            function toTimeLineDateObjectFromWork(workItem) {
                return {
                    times: [{
                        title: workItem.company,
                        color: workItem.color,
                        "starting_time": new Date(Date.parse(workItem.startDate)),
                        "ending_time": workItem.endDate ? new Date(Date.parse(workItem.endDate)) : new Date(),
                    }]
                };
            }

            function toTimeLineDateObjectFromEducation(educationItem) {
                return {
                    times: [{
                        title: educationItem.institution,
                        color: educationItem.color,
                        "starting_time": new Date(Date.parse(educationItem.startDate)),
                        "ending_time": educationItem.endDate ? new Date(Date.parse(educationItem.endDate)) : new Date(),
                    }]
                };
            }

            function withHiddenClassToTimelineData(timelineDateObject) {
                timelineDateObject.class = "hidden";
                return timelineDateObject;
            }

            function addEducationRibbonToTimeline(svg, chart, educationDateConfig) {
                var time = educationDateConfig.times[0].ending_time;
                var topadding = 10;
                svg.append("svg:image")
                    .attr('x', function() {
                        var scaleFactor = (1 / (chart.ending() - chart.beginning())) * (chart.width() - chart.margin().left - chart.margin().right);
                        var imageWidth = 32;
                        return (chart.margin().left + (time - chart.beginning()) * scaleFactor) - imageWidth / 2;
                    })
                    .attr('width', 32)
                    .attr('height', 32)
                    .attr('fill', 'black')
                    .attr("xlink:href", EducationIcons.fromColor(educationDateConfig.times[0].color))
                    .append("svg:title")
                    .text(function(d) {
                        return educationDateConfig.times[0].title;
                    });
            }

            function buildTimeline(resume) {
                d3.select($element[0]).selectAll('*').remove();
                
                var workDates = resume.work.map(toTimeLineDateObjectFromWork),
                    educationDates = resume.education.map(toTimeLineDateObjectFromEducation).map(withHiddenClassToTimelineData),
                    allDates = workDates.concat(educationDates);

                var chart = d3.timeline();
                var width = d3.select($element[0]).node().getBoundingClientRect().width;

                var chart = d3.timeline()
                    .tickFormat({
                        format: d3.time.format("%Y"),
                        tickTime: d3.time.years,
                        tickInterval: 1,
                        tickSize: 3
                    })
                    .rotateTicks(45);

                var svg = d3.select($element[0]).append("svg").attr("width", width)
                    .datum(allDates).call(chart);

                d3.select($element[0])
                    .selectAll("text")
                    .style("font-size", 12);

                d3.select($element[0])
                    .selectAll("rect")
                    .on('click', function(d){
                        $anchorScroll(d.title);
                    })
                    .append("svg:title")
                    .text(function(d) {
                        return d.title;
                    });

                educationDates.forEach(function(educationDate) {
                    if (educationDate.times[0].ending_time)
                        addEducationRibbonToTimeline(svg, chart, educationDate);
                })
            }

            $scope.$watch('resume', function(resume) {
                if (resume && resume.work || resume.education) {
                    buildTimeline(resume);
                }
            });
        }]
    }
}]);
