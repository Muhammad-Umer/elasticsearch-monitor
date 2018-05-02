/**
 * Created by muhammad.umer on 12/4/2017.
 */
var elasticSearchGateway = require('../gateway/elasticsearch-gateway');
var cloudWatchGateway = require('../gateway/cloud-watch-gateway');
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
                    stat.cpu = {};
                    stat.cpu.loadAverage = {};
                    stat.cpu.utilization = nodes[key].os.cpu.percent;
                    stat.cpu.loadAverage.per1m = nodes[key].os.cpu.load_average["1m"];
                    stat.cpu.loadAverage.per5m = nodes[key].os.cpu.percent["5m"];
                    stat.cpu.loadAverage.per15m = nodes[key].os.cpu.percent["15m"];

                    stat.mem = {};
                    stat.mem.totalInBytes = nodes[key].os.mem.total_in_bytes;
                    stat.mem.freeInBytes = nodes[key].os.mem.free_in_bytes;
                    stat.mem.usedInBytes = nodes[key].os.mem.used_in_bytes;
                    stat.mem.memFreePercent = nodes[key].os.mem.free_percent;
                    stat.mem.memUsedPercent = nodes[key].os.mem.used_percent;

                    stat.swap = {};
                    stat.swap.totalInBytes = nodes[key].os.swap.total_in_bytes;
                    stat.swap.freeInBytes = nodes[key].os.swap.free_in_bytes;
                    stat.swap.usedInBytes = nodes[key].os.swap.used_in_bytes;
                }

                if (requiredStats.contains("process")) {
                    stat.process = {};
                    stat.process.timestamp = nodes[key].process.timestamp;
                    stat.process.openFileDescriptors = nodes[key].process.open_file_descriptors;
                    stat.process.maxFileDescriptors = nodes[key].process.max_file_descriptors;
                    stat.process.cpu = {};
                    stat.process.cpu.percent = nodes[key].process.cpu["percent"];
                    stat.process.cpu.totalInMillis = nodes[key].process.cpu["total_in_millis"];
                    stat.process.mem = {};
                    stat.process.mem.totalVirtualInBytes = nodes[key].process.mem["total_virtual_in_bytes"];
                }

                if (requiredStats.contains("jvm")) {
                    stat.jvm = {};
                    stat.jvm.timestamp = nodes[key].jvm.timestamp;
                    stat.jvm.uptimeInMills = nodes[key].jvm.uptime_in_millis;
                    stat.jvm.mem = {};
                    stat.jvm.mem.heapUsedInBytes = nodes[key].jvm.mem.heap_used_in_bytes;
                    stat.jvm.mem.heapUsedPercent = nodes[key].jvm.mem.heap_used_percent;
                    stat.jvm.mem.heapCommitedInBytes = nodes[key].jvm.mem.heap_committed_in_bytes;
                    stat.jvm.mem.nonHeapUsedInBytes = nodes[key].jvm.mem.non_heap_used_in_bytes;
                    stat.jvm.mem.nonHeapCommitedInBytes = nodes[key].jvm.mem.non_heap_committed_in_bytes;

                    stat.jvm.threads = {};
                    stat.jvm.threads.count = nodes[key].jvm.threads.count;
                    stat.jvm.threads = nodes[key].jvm.threads.peak_count;

                    //TODO: complete JVM
                }

                if (requiredStats.contains("indices")) {
                    stat.indices = {};
                    stat.indices.docs = {};
                    stat.indices.docs.count = nodes[key].indices.docs.count;
                    stat.indices.docs.deleted = nodes[key].indices.docs.deleted;
                    stat.indices.store = {};
                    stat.indices.store.sizeInBytes = nodes[key].indices.store.size_in_bytes;
                    stat.indices.store.throttleTimeInMillis = nodes[key].indices.store.throttle_time_in_millis;

                    //TODO: complete Indices
                }

                if (requiredStats.contains("thread_pool")) {
                    stat.threadPool = {};

                    //TODO: complete Thread Pool
                }

                if (requiredStats.contains("fs")) {
                    stat.fs = {};

                    //TODO: complete fs
                }

                if (requiredStats.contains("breakers")) {
                    stat.breakers = {};

                    //TODO: complete Breakers
                }

                if (requiredStats.contains("script")) {
                    stat.script = {};

                    //TODO: complete Script
                }

                if (requiredStats.contains("discovery")) {
                    stat.discovery = {};

                    //TODO: complete Discovery
                }

                if (requiredStats.contains("ingest")) {
                    stat.ingest = {};

                    //TODO: complete Injest
                }

                statistics.stats.push(stat);
            }
        });
        cloudWatchGateway.sendMetricsData(params);
        callback(statistics);
    });
};