var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));

app.listen(32132);

var pathToWkHtmlToPdf = "C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf";

var wkhtmltopdf = require("wkhtmltopdf"),
    fs = require('fs');

wkhtmltopdf.command = pathToWkHtmlToPdf;

app.get('/print', function(req, res) {
    var fileName = new Date().getTime() + '.pdf';
    var publicFilePath = path.join("public", fileName);
    var fullFilePath = path.join(__dirname, publicFilePath);
    var fileStream = wkhtmltopdf("http://localhost:32132?print-css=true", {
            pageSize: 'letter',
            javascriptDelay: 2000
        })
        .pipe(fs.createWriteStream(fullFilePath));
    fileStream.on("finish", function() {
        console.log("Converted file", publicFilePath);
        res.type('application/pdf');
        res.redirect("/" + publicFilePath);
    });
});
