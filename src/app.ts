import express from "express";
import config from "config";
import connectToDatabese from "../src/utils/connect"
import logger from "../src/utils/logger";
import mainRouter from "./mainRouter"
import hospitalRouter from "./hospitalRouter";
import bodyParser from "body-parser";
const app = express();
const port  = config.get<number>("port");
app.listen(port , async ()=>{
    logger.info(`App is running at http://localhost:${port}`);
    await connectToDatabese();
})

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use("/api/hospital" , hospitalRouter);
app.use("/api" , mainRouter);


export default app;
