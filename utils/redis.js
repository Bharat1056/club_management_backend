import Redis from "ioredis";
const serviceUrl = process.env.AIVEN_REDIS_SERVICE_URL;
const redis = new Redis(serviceUrl, {
    maxRetriesPerRequest: null,
});

export default redis;
