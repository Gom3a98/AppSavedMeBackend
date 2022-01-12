import request from 'supertest';
import HospitalController from '../controllers/Hospital.contoller';

const app = require("../app");
const hospitalController: HospitalController = new HospitalController;
request
describe("Hospital Controller", () => {
    describe("test Hopsital endpoints ", () => {
        it('tests /getHospital endpoint', async () => {
            const response = await request(app).get("api/hospital/getHospital/61dd9bc451513337e93d02af");
            expect(response.body).toEqual(
                {
                    _id: "61dd9bc451513337e93d02af",
                    name: "NDA",
                    address: "Cairo , Egypt",
                    location: {
                        type: "Point",
                        coordinates: [
                            -72.7738706,
                            41.6332836
                        ]
                    },
                    bio: "sifjdfjdl",
                    numberOfRooms: 10,
                    availableRooms: 5,
                    password: "1234"
                }
            );
            expect(response.statusCode).toBe(200);
        });
    })
})