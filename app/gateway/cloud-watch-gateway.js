var awsConfig = require('../../app/config/config').aws;
const forEach = require('../../node_modules/async/eachOfLimit');
const asyncThreads = require('../../app/config/config').util.asyncThreads;
const AWS = require("aws-sdk");
AWS.config.update(awsConfig);
const cloudWatch = new AWS.CloudWatch();

exports.sendMetricsData = (params) => {
    console.log("Metrics found: " + params.length);

    forEach(params, asyncThreads, publishMetrics, err => {
        if (err) {
            console.log(err);
        }
    })
};

function publishMetrics(param, index, callback) {
    cloudWatch.putMetricData(param, function(err, data) {
        if(err) {
            console.log("Error while publishing metrics: ", err, err.stack);
            callback(err);
        }else{
            console.log("Published successfully: ", data);
            callback(null, data);
        }
    });
}