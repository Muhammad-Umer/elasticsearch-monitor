'use strict';

module.exports = {
    aws: {
        accessKeyId: "{accessKeyId}",
        secretAccessKey: "{secretAccessKey}",
        region: "{region}"
    },
    systemUrl: {
        health: '_cluster/health',
        nodesStats: '_nodes/stats'
    },
    gateway: {
        elasticsearch: {
            dummyCluster1: {
                baseUrl: "https://dummy-cluster-1-88jfhsdj388829029cxjh3j3j33jh33jh43.eu-west-1.es.amazonaws.com/"
            },
            dummyCluster2: {
                baseUrl: "https://dummy-cluster-2-88jfhsdj388829029cxjh3j3j33jh33jh43.us-east-1.es.amazonaws.com/"
            }
        }
    },
    server: {
        port: 2000
    },
    util: {
        asyncThreads: 10
    }
};