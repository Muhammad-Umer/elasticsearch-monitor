/**
 * Created by muhammad.umer on 12/4/2017.
 */
var elasticSearchGateway = require('../gateway/elasticsearch-gateway');
var cloudWatchGateway = require('../gateway/cloud-watch-gateway');
var statisticsService = require('./statistics-service');
const nameSpacePrefix = "ElasticSearch/";

exports.getNodesStatus = (item, requiredStats, callback) => {
    var params = [];
    Promise.all([elasticSearchGateway.getNodesStatusFromCluster(item, requiredStats), elasticSearchGateway.getNodeHealth(item)]).then(resp => {
        let statistics = {};
        let statusResponse = JSON.parse(resp[0]);
        let healthResponse = JSON.parse(resp[1]);
        let nodes = statusResponse.nodes;
        statistics.clusterName = statusResponse.cluster_name;
        statistics.stats = [];
        statistics.health = {};
        statistics.health.status = healthResponse.status;
        statistics.health.nodesCount = healthResponse.number_of_nodes;
        statistics.health.dataNodesCount = healthResponse.number_of_data_nodes;
        statistics.health.activePrimaryShard = healthResponse.active_primary_shards;
        statistics.health.activeShard = healthResponse.active_shards;

        let MetricDataModel = {
            Namespace: nameSpacePrefix + statistics.clusterName.split(":")[1],
            MetricData: []
        };

        let MetricData = {
            MetricName: "",
            Value: "",
            Unit: "Percent",
            Timestamp: new Date(),
            Dimensions: [
                {
                    Name: 'STRING_VALUE',
                    Value: 'STRING_VALUE'
                }
            ]
        };

        Object.keys(nodes).forEach(function (key) {
            if (nodes[key].roles.includes("data")) {
                let metricDataModel = Object.assign({}, MetricDataModel);
                let metricData = Object.assign({}, MetricData);
                metricData.Dimensions.Name = "Node Name";
                metricData.Dimensions.Value = key;
                metricDataModel.MetricData.push(metricData);

                let stat = {};
                stat.node = key;

                if (requiredStats.contains("os")) {
                    stat.os = statisticsService.getCpuStatistics(nodes);
                }

                if (requiredStats.contains("process")) {
                    stat.process = exports.getProcessStatistics(nodes);
                }

                if (requiredStats.contains("jvm")) {
                    stat.jvm = exports.getJvmStatistics(nodes);
                }

                if (requiredStats.contains("indices")) {
                    stat.indices = exports.getIndicesStatistics(nodes);
                }

                if (requiredStats.contains("thread_pool")) {
                    stat.threadPool = exports.getThreadPoolStatistics(nodes);
                }

                if (requiredStats.contains("fs")) {
                    stat.fs = exports.getFileSystemStatistics(nodes);
                }

                if (requiredStats.contains("breakers")) {
                    stat.breakers = exports.getBreakersStatistics(nodes);
                }

                if (requiredStats.contains("script")) {
                    stat.script = exports.getScriptsStatistics(nodes);
                }

                if (requiredStats.contains("discovery")) {
                    stat.discovery = exports.getDiscoveryStatistics(nodes);
                }

                if (requiredStats.contains("ingest")) {
                    stat.ingest = exports.getIngestStatistics(nodes);
                }

                statistics.stats.push(stat);
            }
        });
        cloudWatchGateway.sendMetricsData(params);
        callback(statistics);
    });
};