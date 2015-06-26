window.addEventListener("load", function() {
    var chart = d3.timeline();
    var width = d3.select('#timeline').node().getBoundingClientRect().width;
    var schoolDates = [{
        times: [{
            "starting_time": new Date("2007-01-01").getTime(),
            "ending_time": new Date("2012-01-01").getTime()
        }]
    }, {
        times: [{
            "starting_time": new Date("2012-01-01").getTime(),
            "ending_time": new Date("2015-01-01").getTime(),
        }]
    }];
    var chart = d3.timeline()
        .tickFormat({
            format: d3.time.format("%Y"),
            tickTime: d3.time.years,
            tickInterval: 1,
            tickSize: 3
        })
        .rotateTicks(20)
        .showTimeAxisTick()
        .stack();

    var svg = d3.select("#timeline").append("svg").attr("width", width)
        .datum(schoolDates).call(chart);
});
