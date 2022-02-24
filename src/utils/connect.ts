import logger from "./logger"
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections: { Hospital?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    try {
        dotenv.config();
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ||"");
        await client.connect();
        const db: mongoDB.Db = client.db(process.env.DB_NAME);
        const Hospital: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME||"Hospital");
        collections.Hospital = Hospital;
        // collections.Hospital.createIndex({ location :  "2dsphere"  })
        logger.info(`Successfully connected to database: ${db.databaseName} and collection: ${Hospital.collectionName}`);
    }
    catch (error : any) {
        logger.error("Couldn't connect to DB " + error);
        process.exit(1);
    }
}
export default connectToDatabase;