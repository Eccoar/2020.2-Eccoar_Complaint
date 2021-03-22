import ControllerComplaint from '../src/controllers/ControllerComplaint';
import { Request, Response } from 'express';
import  { ComplaintRepository } from '../src/repositories/ComplaintRepository';
jest.mock('../src/repositories/ComplaintRepository');
import { Complaint } from '../src/entity/Complaint';

const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const complaintMock = {
    "id": 11,
    "name": "Geri",
    "description": "Disarticulation of elbow",
    "latitude": -7,
    "longitude": 24,
    "userId": 11,
    "category": "Hole",
    "creationDate": "2020-09-07T03:35:18.000Z",
    "closeDate": "2021-07-11T15:10:00.000Z",
    "status": "open"
} as Complaint

describe("complaints", () => {
    test("should take complaints from complaints()", async () => {
        jest.spyOn(ComplaintRepository.prototype, "getAllComplaints").mockImplementationOnce(() => Promise.resolve({
            complaints: [complaintMock],
            count: 100
        }))
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.query = {
            "skip": "10",
            "take": "5"
        };
        const mResp = mockResponse();
        await controller.complaints(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith({
            complaints: [complaintMock],
            count: 100
        });
    });

    test("shouldn't take complaints from complaints()", async () => {
        jest.spyOn(ComplaintRepository.prototype, "getAllComplaints").mockImplementationOnce(() => Promise.reject(new Error()))
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.query = {
            "skip": "10",
            "take": "5"
        };
        const mResp = mockResponse();
        await controller.complaints(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(400);
    });
})

describe("CreateComplaint",() => {
    test("should return status code 201", async() => {

        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        mReq.body = {
            "name": "some-name",
            "description": "some-description",
            "latitude": 10,
            "longitude": -10,
            "userId": 0,
            "category": "Hole"
        };
        const mResp = mockResponse();

        jest.spyOn(ComplaintRepository.prototype, 'createComplaint').mockImplementation();

        await controller.create(mReq, mResp);
        expect(mResp.sendStatus).toHaveBeenCalledWith(201);
    });

    test("should return status code 400", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        const mResp = mockResponse();

        jest.spyOn(ComplaintRepository.prototype, 'createComplaint').mockImplementation(() => {throw new Error()});

        await controller.create(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(400);

    });
});


describe("pong", () => {

    test("should return ping-pong for pong()", async () => {
        const controller = new ControllerComplaint();
        const mReq = {} as Request;
        const mResp = mockResponse();
        await controller.pong(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith({ ping: "pong" });
    });

});