angular.module('resume').directive('descriptors', function() {
    return {
        scope: {
            descriptors: "=",
            name: "="
        },
        controller: ['$scope', '$element', function($scope, $element) {
            var element = $element[0];

            function buildDescriptorRibbons(words, name) {
                d3.select(element).selectAll('*').remove();

                var width = d3.select(element).node().getBoundingClientRect().width,
                    height = width,
                    radius = Math.min(width, height) / 2,
                    outerArcOuterRadius = radius - radius / 11,
                    outerArcInnerRadius = radius - radius / 3,
                    outerArcTextPathRadius = (outerArcOuterRadius + outerArcInnerRadius) / 2,
                    innerArcOuterRadius = radius - radius / 2.7,
                    innerArcInnerRadius = radius - radius / 1.5,
                    innerArcTextPathRadius = (innerArcOuterRadius + innerArcInnerRadius) / 2,
                    startingAngle = -Math.PI * 3 / 4,
                    endingAngle = Math.PI * 3 / 4;

                var outerArc = d3.svg.arc()
                    .outerRadius(outerArcOuterRadius)
                    .innerRadius(outerArcInnerRadius)
                    .startAngle(startingAngle)
                    .endAngle(endingAngle);

                var outerArcTextPath = d3.svg.arc()
                    .outerRadius(outerArcTextPathRadius)
                    .innerRadius(outerArcTextPathRadius)
                    .startAngle(startingAngle)
                    .endAngle(endingAngle);

                var innerArc = d3.svg.arc()
                    .outerRadius(innerArcOuterRadius)
                    .innerRadius(innerArcInnerRadius)
                    .startAngle(startingAngle)
                    .endAngle(endingAngle);

                var innerArcTextPath = d3.svg.arc()
                    .outerRadius(innerArcTextPathRadius)
                    .innerRadius(innerArcTextPathRadius)
                    .startAngle(startingAngle)
                    .endAngle(endingAngle);

                var svg = d3.select(element).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                svg.append("text")
                    .attr("font-size", "1em")
                    .attr("font-family", "Oswald")
                    .style("text-anchor", "middle")
                    .style("text-transform", "uppercase")
                    .text(name);

                svg.append("path")
                    .attr("d", outerArc)
                    .attr("id", "outerArc")
                    .style("fill", function(d) {
                        return "#eff1f0";
                    });

                svg.append("path")
                    .attr("d", outerArcTextPath)
                    .attr("id", "outerArcTextPath")
                    .style("fill", "none");

                svg.append("path")
                    .attr("d", innerArc)
                    .attr("id", "innerArc")
                    .style("fill", function(d) {
                        return "#0184ba";
                    });

                svg.append("path")
                    .attr("d", innerArcTextPath)
                    .attr("id", "innerArcTextPath")
                    .style("fill", "none");


                function addWordToOuterArc(word, offset) {
                    return svg.append("text")
                        .append("textPath")
                        .attr("fill", "#706f75")
                        .attr("font-size", "0.8em")
                        .attr("font-family", "Open Sans")
                        .attr("xlink:href", "#outerArcTextPath")
                        .attr("dominant-baseline", 'middle')
                        .style("text-transform", "uppercase")
                        .attr("startOffset", function() {
                            return offset;
                        })
                        .text(word);
                }

                function addWordToInnerArc(word, offset) {
                    return svg.append("text")
                        .append("textPath")
                        .attr("fill", "white")
                        .attr("font-size", "0.8em")
                        .attr("font-family", "Open Sans")
                        .attr("xlink:href", "#innerArcTextPath")
                        .attr("dominant-baseline", 'middle')
                        .style("text-transform", "uppercase")
                        .attr("startOffset", function() {
                            return offset;
                        })
                        .text(word);
                }

                function radiansToDegrees(radian) {
                    return radian * (180 / Math.PI);
                }

                function findAngleBetweenDegrees(start, end) {
                    return Math.abs((Math.abs(start - end) % 360));
                }

                function getArcLength(angle, radius) {
                    return angle * (Math.PI / 180) * radius;
                }

                function getComputedArcLength(arc) {
                    var startingRadian = arc.startAngle()(),
                        endingRadian = arc.endAngle()(),
                        radius = arc.outerRadius()();

                    return getArcLength(findAngleBetweenDegrees(radiansToDegrees(startingRadian), radiansToDegrees(endingRadian)), radius);
                }

                var padding = 15;

                function findWordsForOuterArc(wordsList) {
                    var newWords = [],
                        indiciesToRemove = [],
                        previousOffset = 0;
                    var arcLength = getComputedArcLength(outerArcTextPath);

                    for (var wordKey in wordsList) {
                        var word = wordsList[wordKey],
                            node = addWordToOuterArc(word, previousOffset).attr("class", "temp"),
                            nodeComputedLength = node.node().getComputedTextLength();

                        if ((previousOffset + nodeComputedLength + padding) < arcLength) {
                            previousOffset += nodeComputedLength + padding;
                            indiciesToRemove.push(wordsList.indexOf(word));
                            newWords.push(word);
                        } else
                            break;
                    }

                    for (var idxKey in indiciesToRemove) {
                        wordsList.splice(indiciesToRemove[idxKey], 1);
                    }

                    svg.selectAll('.temp').remove();

                    return {
                        wordsThatFit: newWords,
                        offset: (arcLength - previousOffset + padding) / 2
                    };
                }

                function findWordsForInnerArc(wordsList) {
                    var newWords = [],
                        indiciesToRemove = [],
                        previousOffset = 0;
                    var arcLength = getComputedArcLength(innerArcTextPath);

                    for (var wordKey in wordsList) {
                        var word = wordsList[wordKey],
                            node = addWordToInnerArc(word, previousOffset).attr("class", "temp"),
                            nodeComputedLength = node.node().getComputedTextLength();

                        if ((previousOffset + nodeComputedLength + padding) < arcLength) {
                            previousOffset += nodeComputedLength + padding;
                            indiciesToRemove.push(wordsList.indexOf(word));
                            newWords.push(word);
                        } else
                            break;
                    }

                    for (var idxKey in indiciesToRemove) {
                        wordsList.splice(indiciesToRemove[idxKey], 1);
                    }

                    svg.selectAll('.temp').remove();

                    return {
                        wordsThatFit: newWords,
                        offset: (arcLength - previousOffset + padding) / 2
                    };
                }

                function fillOuterArc(words) {
                    var outerArcWordsAndOffset = findWordsForOuterArc(words);
                    var previousOffset = outerArcWordsAndOffset.offset;
                    for (var wordKey in outerArcWordsAndOffset.wordsThatFit) {
                        var node = addWordToOuterArc(outerArcWordsAndOffset.wordsThatFit[wordKey], previousOffset);
                        previousOffset += padding + node.node().getComputedTextLength();
                    }
                }

                function fillInnerArc(words) {
                    var innerArcWordsAndOffset = findWordsForInnerArc(words);
                    var previousOffset = innerArcWordsAndOffset.offset;
                    for (var wordKey in innerArcWordsAndOffset.wordsThatFit) {
                        var node = addWordToInnerArc(innerArcWordsAndOffset.wordsThatFit[wordKey], previousOffset);
                        previousOffset += padding + node.node().getComputedTextLength();
                    }
                }

                fillOuterArc(words);
                fillInnerArc(words);
            }

            $scope.$watchGroup(['descriptors', 'name'], function(stuff) {
                var descriptors = stuff[0],
                    name = stuff[1];

                buildDescriptorRibbons(descriptors, name);
            });
        }]
    }
});
