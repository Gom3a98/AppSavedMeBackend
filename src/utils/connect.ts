import config from "config";
import logger from "./logger"
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections: { Hospital?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    try {
        dotenv.config();
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.get<string>("dbUri"));
        await client.connect();
        const db: mongoDB.Db = client.db(process.env.DB_NAME);
        const Hospital: mongoDB.Collection = db.collection(config.get<string>("collectionName"));
        collections.Hospital = Hospital;
        logger.info(`Successfully connected to database: ${db.databaseName} and collection: ${Hospital.collectionName}`);
    }
    catch (error : any) {
        logger.error("Couldn't connect to DB " + error);
        process.exit(1);
    }
}
export default connectToDatabase;