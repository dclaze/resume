angular.module('resume').directive('interests', function() {
    return {
        scope: {
            interests: "="
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.$watchCollection('interests', function(interests) {
                if (interests) {
                    buildInterestCloud(interests.map(function(i) {
                        return i.name;
                    }));
                }
            });

            function getWords(words) {
                return words.map(function(d) {
                    var size = 20 + Math.random() * 5;
                    return {
                        text: d,
                        size: size,
                    };
                });
            }

            function buildInterestCloud(interests) {
                d3.select($element[0]).selectAll('*').remove();
                var fill = d3.scale.category20();

                var width = d3.select($element[0]).node().getBoundingClientRect().width,
                    height = width * 9 / 16;

                function draw(words) {
                    d3.select($element[0])
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                        .selectAll("text")
                        .data(words)
                        .enter().append("text")
                        .style("font-size", function(d) {
                            return d.size + "px";
                        })
                        .style("font-family", "Impact")
                        .style("fill", function(d, i) {
                            return fill(i);
                        })
                        .attr("text-anchor", "middle")
                        .attr("transform", function(d) {
                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                        })
                        .text(function(d) {
                            return d.text;
                        });
                }

                var layout = d3.layout.cloud()
                    .size([width, height])
                    .words(getWords(interests))
                    .padding(5)
                    .rotate(function() {
                        return ~~(Math.random() * 2) * 90;
                    })
                    .font("Impact")
                    .fontSize(function(d) {
                        return d.size;
                    })
                    .on("end", draw);
                layout.start();
            }
        }]
    }
})
