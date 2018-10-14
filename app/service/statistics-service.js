/**
 * Created by muhammad.umer on 05/02/2018.
 */
exports.getCpuStatistics = (nodes) => {
    let os = {};
    os.cpu = {};
    os.cpu.loadAverage = {};
    os.cpu.utilization = nodes[key].os.cpu.percent;
    os.cpu.loadAverage.per1m = nodes[key].os.cpu.load_average["1m"];
    os.cpu.loadAverage.per5m = nodes[key].os.cpu.percent["5m"];
    os.cpu.loadAverage.per15m = nodes[key].os.cpu.percent["15m"];

    os.mem = {};
    os.mem.totalInBytes = nodes[key].os.mem.total_in_bytes;
    os.mem.freeInBytes = nodes[key].os.mem.free_in_bytes;
    os.mem.usedInBytes = nodes[key].os.mem.used_in_bytes;
    os.mem.memFreePercent = nodes[key].os.mem.free_percent;
    os.mem.memUsedPercent = nodes[key].os.mem.used_percent;

    os.swap = {};
    os.swap.totalInBytes = nodes[key].os.swap.total_in_bytes;
    os.swap.freeInBytes = nodes[key].os.swap.free_in_bytes;
    os.swap.usedInBytes = nodes[key].os.swap.used_in_bytes;

    return os;
};

exports.getProcessStatistics = (nodes) => {
    let process = {};
    process.timestamp = nodes[key].process.timestamp;
    process.openFileDescriptors = nodes[key].process.open_file_descriptors;
    process.maxFileDescriptors = nodes[key].process.max_file_descriptors;
    process.cpu = {};
    process.cpu.percent = nodes[key].process.cpu["percent"];
    process.cpu.totalInMillis = nodes[key].process.cpu["total_in_millis"];
    process.mem = {};
    process.mem.totalVirtualInBytes = nodes[key].process.mem["total_virtual_in_bytes"];

    return process;
};

exports.getJvmStatistics = (nodes) => {
    let jvm = {};
    jvm.timestamp = nodes[key].jvm.timestamp;
    jvm.uptimeInMills = nodes[key].jvm.uptime_in_millis;
    jvm.mem = {};
    jvm.mem.heapUsedInBytes = nodes[key].jvm.mem.heap_used_in_bytes;
    jvm.mem.heapUsedPercent = nodes[key].jvm.mem.heap_used_percent;
    jvm.mem.heapCommitedInBytes = nodes[key].jvm.mem.heap_committed_in_bytes;
    jvm.mem.nonHeapUsedInBytes = nodes[key].jvm.mem.non_heap_used_in_bytes;
    jvm.mem.nonHeapCommitedInBytes = nodes[key].jvm.mem.non_heap_committed_in_bytes;

    jvm.threads = {};
    jvm.threads.count = nodes[key].jvm.threads.count;
    jvm.threads = nodes[key].jvm.threads.peak_count;

    //TODO: complete JVM

    return jvm;
};

exports.getIndicesStatistics = (nodes) => {
    let indices = {};
    indices.docs = {};
    indices.docs.count = nodes[key].indices.docs.count;
    indices.docs.deleted = nodes[key].indices.docs.deleted;

    indices.store = {};
    indices.store.sizeInBytes = nodes[key].indices.store.size_in_bytes;
    indices.store.throttleTimeInMillis = nodes[key].indices.store.throttle_time_in_millis;
    indices.indexing.indexTotal = nodes[key].indices.indexing.index_total;

    indices.indexing = {};
    indices.indexing.indexTimeInMillis = nodes[key].indices.indexing.index_time_in_millis;
    indices.indexing.indexCurrent = nodes[key].indices.indexing.index_current;
    indices.indexing.deleteTotal = nodes[key].indices.indexing.delete_total;
    indices.indexing.deleteTimeInMillis = nodes[key].indices.indexing.delete_time_in_millis;
    indices.indexing.noopUpdateTotal = nodes[key].indices.indexing.noop_update_total;
    indices.indexing.isThrottled = nodes[key].indices.indexing.is_throttled;
    indices.indexing.throttleTimeInMillis = nodes[key].indices.indexing.throttle_time_in_millis;

    //TODO: complete Indices

    return indices;
};

exports.getThreadPoolStatistics = (nodes) => {
    let threadPool = {};

    //TODO: complete Thread Pool

    return threadPool;
};

exports.getFileSystemStatistics = (nodes) => {
    let fs = {};
    fs.timestamp = nodes[key].fs.timestamp;

    fs.total = {};
    fs.total.totalInBytes = nodes[key].fs.total.total_in_bytes;
    fs.total.freeInBytes = nodes[key].fs.total.free_in_bytes;
    fs.total.availableInBytes = nodes[key].fs.total.available_in_bytes;

    //TODO: complete fs

    return fs;
};

exports.getBreakersStatistics = (nodes) => {
    let breakers = {};

    //TODO: complete Breakers
    
    return breakers;
};

exports.getScriptsStatistics = (nodes) => {
    let script = {};

    //TODO: complete Script
    
    return script;
};

exports.getDiscoveryStatistics = (nodes) => {
    let discovery = {};

    //TODO: complete Discovery
    
    return discovery;
};

exports.getIngestStatistics = (nodes) => {
    let ingest = {};

    //TODO: complete Injest

    return ingest;
};