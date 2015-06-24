window.addEventListener("load", function() {
    var width = d3.select('#descriptors').node().getBoundingClientRect().width,
        height = width;
    radius = Math.min(width, height) / 2;

    var outerArcOuterRadius = radius - radius / 11,
        outerArcInnerRadius = radius - radius / 3,
        innerArcOuterRadius = radius - radius / 2.7,
        innerArcInnerRadius = radius - radius / 1.5;

    var outerArc = d3.svg.arc()
        .outerRadius(outerArcOuterRadius)
        .innerRadius(outerArcInnerRadius)
        .startAngle(Math.PI * 3/4)
        .endAngle(-Math.PI * 3/4);
    var innerArc = d3.svg.arc()
        .outerRadius(innerArcOuterRadius)
        .innerRadius(innerArcInnerRadius)
        .startAngle(Math.PI * 3/4)
        .endAngle(-Math.PI * 3/4);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d.population;
        });

    var svg = d3.select("#descriptors").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var outerData = [{
        age: "Goal Driven",
        population: 100
    }, {
        age: "5-13",
        population: 100
    }, {
        age: "14-17",
        population: 100
    }, {
        age: "18-24",
        population: 100
    }, {
        age: "25-44",
        population: 100
    }, {
        age: "45-64",
        population: 100
    }, {
        age: "Creative",
        population: 100
    }]

    outerData.forEach(function(d) {
        d.population = +d.population;
    });

    var g = svg.selectAll(".arc")
        .data(pie(outerData))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", outerArc)
        .style("fill", function(d) {
            return "#eff1f0";
        });

    g.append("path")
        .attr("d", innerArc)
        .style("fill", function(d) {
            return "#0184ba";
        });

    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + outerArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.age;
        });
});
