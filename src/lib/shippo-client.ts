import { Shippo } from "shippo";

const shippo = new Shippo({
    apiKeyHeader: process.env.SHIPPO_API_KEY,
    // the API version can be globally set, though this is normally not required
    // shippoApiVersion: "<YYYY-MM-DD>",
});

export default shippo;