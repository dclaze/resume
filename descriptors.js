window.addEventListener("load", function() {
    var width = d3.select('#descriptors').node().getBoundingClientRect().width,
        height = width;
    radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var outerArc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 60);
    var innerArc = d3.svg.arc()
        .outerRadius(radius - 70)
        .innerRadius(radius - 110);

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
        age: "<5",
        population: 2704659
    }, {
        age: "5-13",
        population: 4499890
    }, {
        age: "14-17",
        population: 2159981
    }, {
        age: "18-24",
        population: 3853788
    }, {
        age: "25-44",
        population: 14106543
    }, {
        age: "45-64",
        population: 8819342
    }, {
        age: "45-64",
        population: 612463
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