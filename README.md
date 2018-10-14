# Elasticsearch Monitor
[![Build Status](https://travis-ci.org/Muhammad-Umer/elasticsearch-monitor.svg?branch=master)](https://travis-ci.org/Muhammad-Umer/elasticsearch-monitor)

 This project intends to provide a simple approach to get node data of an Elasticsearch cluster and publish metrics to Cloudwatch 
 
 ## Getting Started
 
 These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
 
 ### Prerequisites
 
 After cloning the repository, you need to have the following:
 ```
 1) IntelliJ or similar tool for making changes
 2) NodeJS for executing locally
 ```
 
 ### Execution
 Two relevant files are present in the project.
 * index.js `Exposed APIs to get metrics of a specific cluster`
 * lambda,js `Handler to publish metrics to CloudWatch`
 
 ## Main Functionality
 
 In `lambda.js`, the handler is executed when the project is uploaded in `AWS lambda`. This scraps
 the relevant metrics from multiple Elasticsearch clusters on the basis on configuration and
 publish those metrics on CloudWatch along with cluster health.
 
 Multiple Elasticsearch environment would be provided in the configuration file (`config.js`):
 
 ```
 elasticsearch: {
    dummyCluster1: {
        baseUrl: "https://dummy-cluster-1-88jfhsdj388829029cxjh3j3j33jh33jh43.eu-west-1.es.amazonaws.com/"
    },
    dummyCluster2: {
        baseUrl: "https://dummy-cluster-2-88jfhsdj388829029cxjh3j3j33jh33jh43.us-east-1.es.amazonaws.com/"
    }        
 }
 ```
 There are different metrics for nodes which are given below:
 
 Metric name | Definition |
 --- | --- |
 indices | Indices stats about size, document count, indexing and deletion times, search times, field cache size, merges and flushes |
 fs | File system information, data path, free disk space, read/write stats |
 http | HTTP connection information |
 jvm | 	JVM stats, memory pool information, garbage collection, buffer pools, number of loaded/unloaded classes |
 process | Process statistics, memory consumption, cpu usage, open file descriptors  |
 os | Operating system stats, load average, mem, swap |
 thread_pool | Statistics about each thread pool, including current size, queue and rejected tasks |
 transport | Transport statistics about sent and received bytes in cluster communication |
 breaker | Statistics about the field data circuit breaker |
 discovery | Statistics about the discovery |
 ingest | Statistics about ingest preprocessing |
 adaptive_selection | Statistics about adaptive replica selection |
 
 The  statistics required should be provided in configuration file as a comma separated string
 ```stats: "os, fs, mem"```
 
 ## Built With
 
 * [IntelliJ](https://www.jetbrains.com/idea/) - IDE used for Development
 * [NodeJS](https://nodejs.org/en/) -  Project development language
 * [AWS SDK](https://aws.amazon.com/sdk-for-node-js/) - For publishing metrics on CloudWatch
 
 ## Authors
 
 * **Muhammad Umer** 
 
 
 ## License
 
 This project is licensed under the GNU General Public License v3.0 License - see the [LICENSE](LICENSE) file for details
>
