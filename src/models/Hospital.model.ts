// Main schema file where we can define the
// required attributes
import * as Mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { collections } from "../utils/connect";
export default class Hospital {
    constructor(
        public	name: String,
        public address: String,
        public location : JSON,
        public bio : String,
        public numberOfRooms : Number,
        public availableRooms : Number,
        public password: String,
        public _id?: ObjectId) {
        }


}