import { MongoClient } from "mongodb"

class MongoConnection {
    static client;
    static db;

    static async connection() {
        if (!this.client) {
            this.client = new MongoClient(process.env.MONGO_URL);
            await this.client.connect();
            this.db = this.client.db("aviones");
        }
    }
}

export default MongoConnection
