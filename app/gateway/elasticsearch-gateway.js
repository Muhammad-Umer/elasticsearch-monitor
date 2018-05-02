const elasticSearchPath = require('../../app/config/config').gateway.elasticsearch;
const nodesStats = require('../../app/config/config').systemUrl.nodesStats;
const health = require('../../app/config/config').systemUrl.health;

var http = require('http');
var rp = require('request-promise');
var elasticsearch = require('../../node_modules/elasticsearch');

exports.getNodesStatusFromCluster = (clusterName, requiredStats) => {
    var baseURL = elasticSearchPath[clusterName].baseUrl;


    var options = {
        method: 'GET',
        uri: baseURL + nodesStats + "/" + requiredStats.join()
    };

    return rp(options);
};

exports.getNodeHealth = (clusterName) => {
    var baseURL = elasticSearchPath[clusterName].baseUrl;

    var options = {
        method: 'GET',
        uri: baseURL + health
    };

    return rp(options);
};
