var work_and_education = {
    "work": [{
        "company": "Marathon Data Systems",
        "position": "Software Developer",
        "website": "",
        "startDate": "2012-05-01",
        "summary": "Architect and implement distributed message based platform applying SOA using NServiceBus and RavenDB for a SaaS Field Service Automation system.\n\nDesign Restful API using C# WebAPI, Develop HTML5 Single Page Application using AngularJS\n\nLead discussions with Product Management and Engineering teams to apply DDD to actual customer business workflows\n\nLead TDD (xUnit and SpecFlow),  and Agile Methodology processes to promote team best practices, code craftsmanship, and quality\n\nImplement continuous deployment strategies using TeamCity, Octopus, and AWS",
        "highlights": []
    }, {
        "company": "Revolution Prep",
        "position": "Tutor",
        "website": "",
        "startDate": "2011-09-01",
        "summary": "Work as an SAT Proctor and facilitate test taking for large groups of students. Tutor students in SAT & ACT standardized tests, this includes grading essays and working with students to improve their scores.",
        "highlights": []
    }, {
        "company": "Liberty Science Center",
        "position": "Exhibit Analysis",
        "website": "",
        "startDate": "2010-05-01",
        "summary": "Worked in new exhibit expo and helped develop exhibit analysis by recording consumer experience and escorting guests through exhibits. Helped design new exhibit for future floor showcase.",
        "highlights": [],
        "endDate": "2012-01-01"
    }],
    "education": [{
        "institution": "New Jersey Institute of Technology",
        "area": "Computer Science",
        "studyType": "Masters of Science",
        "startDate": "2012-01-01",
        "gpa": "",
        "courses": [],
        "endDate": null
    }, {
        "institution": "New Jersey Institute of Technology",
        "area": "Applied Physics, Computer Science",
        "studyType": "Bachelor of Applied Science (B.A.Sc.)",
        "startDate": "2007-01-01",
        "gpa": "",
        "courses": [],
        "endDate": "2012-01-01"
    }]
};

function addWorkColors(workItems) {
    var workColors = ["#343338", "#146ea3"],
        colorIndex = 0;
    for (var workItemKey in workItems) {
        var workItem = workItems[workItemKey];
        workItem.color = workColors[colorIndex % workColors.length];
        colorIndex++;
    }
}
addWorkColors(work_and_education.work);

function addEducationColors(educationItems) {
    var educationColors = ["#d2232a", "#00aeef", "#41ad49"],
        colorIndex = 0;
    for (var educationItemKey in educationItems) {
        var educationItem = educationItems[educationItemKey];
        educationItem.color = educationColors[colorIndex % educationColors.length];
        colorIndex++;
    }
}

addEducationColors(work_and_education.education);

function toTimeLineDateObject(startAndEndDateObject) {
    return {
        times: [{
            color: startAndEndDateObject.color,
            "starting_time": new Date(Date.parse(startAndEndDateObject.startDate)),
            "ending_time": startAndEndDateObject.endDate ? new Date(Date.parse(startAndEndDateObject.endDate)) : new Date(),
        }]
    };
}

function withHiddenClassToTimelineData(timelineDateObject) {
    timelineDateObject.class = "hidden";
    return timelineDateObject;
}

function getIconPathFromColor(hexColor) {
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

function addEducationRibbonToTimeline(svg, chart, educationDateConfig) {
    var time = educationDateConfig.times[0].ending_time;
    svg.append("svg:image")
        .attr('x', function() {
            var scaleFactor = (1 / (chart.ending() - chart.beginning())) * (chart.width() - chart.margin().left - chart.margin().right);
            var imageWidth = 32;
            return (chart.margin().left + (time - chart.beginning()) * scaleFactor) - imageWidth / 2;
        })
        .attr('width', 32)
        .attr('height', 32)
        .attr('fill', 'black')
        .attr("xlink:href", getIconPathFromColor(educationDateConfig.times[0].color));
}



var workDates = work_and_education.work.map(toTimeLineDateObject);
var educationDates = work_and_education.education.map(toTimeLineDateObject).map(withHiddenClassToTimelineData);

window.addEventListener("load", function() {
    var chart = d3.timeline();
    var width = d3.select('#timeline').node().getBoundingClientRect().width;

    var chart = d3.timeline()
        .tickFormat({
            format: d3.time.format("%Y"),
            tickTime: d3.time.years,
            tickInterval: 1,
            tickSize: 3
        })
        .rotateTicks(40)
        .showTimeAxisTick();

    var svg = d3.select("#timeline").append("svg").attr("width", width)
        .datum(workDates.concat(educationDates)).call(chart);

    educationDates.forEach(function(educationDate) {
        if (educationDate.times[0].ending_time)
            addEducationRibbonToTimeline(svg, chart, educationDate);
    })
});
