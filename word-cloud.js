var words = ["node.js", "Raspberry Pi", "drones", "AI", "Silicon Valley", "NASA", "Space", "Running", "Raspberry Pi", "drones", "AI", "Silicon Valley", "NASA", "Space", "Running", "Raspberry Pi", "drones", "AI", "Silicon Valley", "NASA", "Space", "Running", "Raspberry Pi", "drones", "AI", "Silicon Valley", "NASA", "Space", "Running"];

function getWords(words) {
    return words.map(function(d) {
        return {
            text: d,
            size: 10 + Math.random() * 90,
        };
    });
}

window.addEventListener("load", function() {
    var fill = d3.scale.category20();

    var width = d3.select('#interests').node().getBoundingClientRect().width,
        height = width * 9 / 16;

    var layout = d3.layout.cloud()
        .size([width, height])
        .words(getWords(words))
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

    function draw(words) {
        d3.select("#interests").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
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
});
