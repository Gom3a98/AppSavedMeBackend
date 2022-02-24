import express from "express";
import connectToDatabese from "../src/utils/connect"
import logger from "../src/utils/logger";
import mainRouter from "./mainRouter"
import hospitalRouter from "./hospitalRouter";
import bodyParser from "body-parser";
import path from "path";
require("dotenv").config();
const app = express();
const port  = process.env.PORT
app.listen(port , async ()=>{
    logger.info(`App is running at http://localhost:${port}`);
    await connectToDatabese();
})

app.set('view engine', 'hbs');
app.use(express.static( path.join(path.resolve(__dirname, '..'), 'views')));
app.use('/public' , express.static( path.join(path.resolve(__dirname, '..'), 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use("/hospital" , hospitalRouter);
app.use("/" , mainRouter);


export default app;
