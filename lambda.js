/**
 * Created by muhammad.umer on 12/29/2017.
 */
'use strict';

const forEach = require('./node_modules/async/eachOfLimit');
const asyncThreads = require('./app/config/config').util.asyncThreads;
var elasticSearchService = require('./app/service/elastic-search-service');
var requiredStats = require('./app/config/config').stats.split(", ");
var esDetails = require('./app/config/config').gateway.elasticsearch;
var esList = [];


console.log('Loading function');

exports.handler = (event, context, callback) => {
    if(!init(esDetails)){
        forEach(esList, asyncThreads, publishMetrics, err => {
            if (err) {
                console.log(err);
            }
        });
        callback(null, 'Hello from Lambda');
    }else {
        console.log("No elasticsearch instances were present");
    }
};

function publishMetrics(param, index, callback) {
    console.log("Metrics are being published for ES: " + param);
    elasticSearchService.getNodesStatus(param, requiredStats, function(resp){
        callback(null, resp);
    });
}


function init(esObj) {
    for(var k in esObj) esList.push(k);
    return esList.length == 0;
}



// For testing lambda function
function main() {
    forEach(esList, asyncThreads, publishMetrics, err => {
        if (err) {
            console.log(err);
        }
    });
}
