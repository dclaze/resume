angular.module('resume', ['ngResource']);

angular.module('resume').controller('Main', ['$scope', 'Resume', function($scope, Resume) {
    $scope.resume = {
        "basics": {
            "name": "Doug Colaizzo",
            "label": "Software Developer  at Marathon Data Systems",
            "picture": "https://media.licdn.com/mpr/mprx/0_tKNR-AMyCXN8-wYfNNuvsiBgC5F8c4O_Z3mRcL2yCbF3cexGZKhR9FZgT9wpAJTPU3GzMQRjITWTNywiYilFVLVAmTWhNyRfZil4AXfp58yuYEhPqtFnlK3DaqPrjyuOA8zcnn2K_TT",
            "email": "dcolaizzo@gmail.com",
            "phone": "2019531983",
            "website": "",
            "location": {
                "address": "",
                "postalCode": "",
                "city": "Greater New York City Area",
                "countryCode": "US",
                "region": ""
            },
            "profiles": []
        },
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
            "endDate": "2015-01-01"
        }, {
            "institution": "New Jersey Institute of Technology",
            "area": "Applied Physics, Computer Science",
            "studyType": "Bachelor of Applied Science (B.A.Sc.)",
            "startDate": "2007-01-01",
            "gpa": "",
            "courses": [],
            "endDate": "2012-01-01"
        }],
        "skills": [{
            "name": "Java",
            "level": "",
            "keywords": []
        }, {
            "name": "JavaScript",
            "level": "",
            "keywords": []
        }, {
            "name": "CSS",
            "level": "",
            "keywords": []
        }, {
            "name": "Python",
            "level": "",
            "keywords": []
        }, {
            "name": "HTML",
            "level": "",
            "keywords": []
        }, {
            "name": "MySQL",
            "level": "",
            "keywords": []
        }, {
            "name": "PHP",
            "level": "",
            "keywords": []
        }, {
            "name": "HTML 5",
            "level": "",
            "keywords": []
        }, {
            "name": "C++",
            "level": "",
            "keywords": []
        }, {
            "name": "C#",
            "level": "",
            "keywords": []
        }, {
            "name": "jQuery",
            "level": "",
            "keywords": []
        }, {
            "name": "Eclipse",
            "level": "",
            "keywords": []
        }, {
            "name": "Web Development",
            "level": "",
            "keywords": []
        }, {
            "name": "Git",
            "level": "",
            "keywords": []
        }, {
            "name": "Node.js",
            "level": "",
            "keywords": []
        }, {
            "name": "iOS development",
            "level": "",
            "keywords": []
        }, {
            "name": "Matlab",
            "level": "",
            "keywords": []
        }, {
            "name": "Agile Methodologies",
            "level": "",
            "keywords": []
        }, {
            "name": "RavenDB",
            "level": "",
            "keywords": []
        }, {
            "name": "NServiceBus",
            "level": "",
            "keywords": []
        }, {
            "name": "AngularJS",
            "level": "",
            "keywords": []
        }, {
            "name": "Ext JS",
            "level": "",
            "keywords": []
        }, {
            "name": "OpenCV",
            "level": "",
            "keywords": []
        }, {
            "name": "Photoshop",
            "level": "",
            "keywords": []
        }, {
            "name": "Android Development",
            "level": "",
            "keywords": []
        }, {
            "name": "SaaS",
            "level": "",
            "keywords": []
        }, {
            "name": "CSS3",
            "level": "",
            "keywords": []
        }, {
            "name": "Processing",
            "level": "",
            "keywords": []
        }, {
            "name": "GIMP",
            "level": "",
            "keywords": []
        }, {
            "name": "PhoneGap",
            "level": "",
            "keywords": []
        }, {
            "name": "SOA",
            "level": "",
            "keywords": []
        }, {
            "name": "Scrum",
            "level": "",
            "keywords": []
        }, {
            "name": "MongoDB",
            "level": "",
            "keywords": []
        }, {
            "name": "Continuous Integration",
            "level": "",
            "keywords": []
        }, {
            "name": "Octopus",
            "level": "",
            "keywords": []
        }, {
            "name": "TeamCity",
            "level": "",
            "keywords": []
        }, {
            "name": "Test Driven Development",
            "level": "",
            "keywords": []
        }, {
            "name": "Mentoring",
            "level": "",
            "keywords": []
        }, {
            "name": "Raspberry Pi",
            "level": "",
            "keywords": []
        }, {
            "name": "Arduino",
            "level": "",
            "keywords": []
        }],
        "languages": [{
            "language": "English",
            "fluency": ""
        }, {
            "language": "Spanish",
            "fluency": ""
        }, {
            "language": "Italian",
            "fluency": ""
        }],
        "references": [{
            "name": "Michael Petretta",
            "reference": "Doug was my team project mentor for our undergraduate senior year capstone project at New Jersey Institute of Technology.  His engagement and ability to positively motivate others guided our team to success in placing 2nd overall at NJIT's 2013 Capstone Competition."
        }, {
            "name": "Eric Farr",
            "reference": "Doug is one of the most creative developers I’ve ever worked with. He brings fresh ideas to every task he faces. His creative energy is infectious, and his sense of humor brings makes even the longest days in the teamroom fun.\r\n\r\nDoug took the initiative to sponsor capstone projects at NJIT. He did an amazing job working with the students and creating a great reputation for the company within the school.\r\n\r\nAny software team would be fortunate to have him, and I would relish the opportunity to work with Doug again."
        }],
        "volunteer": [],
        "awards": []
    }; //Resume.get({id: "1awb0"});
}])
