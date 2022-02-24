// Main schema file where we can define the
// required attributes
import * as Mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { collections } from "../utils/connect";
export default class Hospital {
    constructor(
        public	name: String,
        public phone: String,
        public type : String, // which is one of the following [Governmental , Private , Others]
        public location : JSON,
        public bio : String,
        public street_name : String,
        public street_number : Number,
        public city : String ,
        public numberOfRooms : Number,
        public availableRooms : Number,
        public _id?: ObjectId) {
        }


}