/**
 * Created by muhammad.umer on 12/4/2017.
 */
const port = require('./app/config/config').server.port;
var express = require('express');
var elasticSearchService = require('./app/service/elastic-search-service');
var requiredStats = require('./app/config/config').stats.split(", ");

var app = express();
app.use(express.static(__dirname + '/app/public'));

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

app.get('/cluster/:clusterName', function(req, res) {
    console.log("clusterName is set to " + req.params.clusterName);
    var data = elasticSearchService.getNodesStatus(req.params.clusterName, requiredStats, function(resp){
        res.send(resp);
    });
});