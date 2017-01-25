var path = require("path");
var express = require("express");

module.exports = function(app) {
    app.get("/survey", function(req, res) {
        // body...
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/", function(req, res) {
        // body...
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.use('/css', function (req, res) {
    	// body...
    	res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
    } )
}