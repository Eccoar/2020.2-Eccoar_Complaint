import { Request, Response } from "express";
import { Votes } from "../entity/Votes";
import { Status } from "../utils/Status";
import { Complaint } from '../entity/Complaint';
import { ComplaintRepository } from '../repositories/ComplaintRepository';
import { VotesRepository } from '../repositories/VotesRepository';

export default class ControllerComplaint {

    complaintRepository: ComplaintRepository;
    voteRepository: VotesRepository;

    constructor() {
        this.complaintRepository = new ComplaintRepository();
        this.voteRepository = new VotesRepository();
    }

    private queryValidator(fields:string[], req:Request){
        const missingFields:string[] = [];
        fields.forEach(field => {
            if(!(field in req.body)) missingFields.push(field);
        });
       
        return missingFields;
    }

    async pong (req: Request, res: Response): Promise<void> {
        const pingPong = {
            ping: "pong"
        }
        res.status(200).json(pingPong);
    }

    async create(req: Request, res:Response): Promise<Response>{
        try {
            
            const fields = ['name', 'description', 'latitude', 'longitude', 'userId', 'category'];
            const missingFields = this.queryValidator(fields, req);

            if(missingFields.length > 0) {
                return res.status(400).json({"msg": `Missing fields [${missingFields}]`});
            }
            const complaint:Complaint = Object.assign(new Complaint(), req.body);
            await this.complaintRepository.createComplaint(complaint);
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({"msg": error});
        }
    }

    async complaints (req: Request, resp: Response): Promise<void> {
        try{
            const response = await this.complaintRepository.getAllComplaints(Number(req.query.skip), Number(req.query.take), String(req.query.orderDate));
            resp.status(200).json(response);
        }
        catch (error) {
            resp.status(400);
            resp.json({
                status: 'erro',
                error
            })
        }
    }

    async addVote (req: Request, res: Response): Promise<Response> {
        const fields = ['userId', 'complaintId', 'typeVote'];
        const missingFields = this.queryValidator(fields, req);
        if(missingFields.length > 0) {
            return res.status(400).json({"msg": `Missing fields [${missingFields}]`});
        }
        try {
            const complaint = await this.complaintRepository.getById(req.body.complaintId);
            if (complaint == undefined || complaint == null) {
                throw new Error('Complaint not found');
            }
            const vote:Votes = Object.assign(new Votes(), req.body);
            this.voteRepository.saveVote(vote);
            const complaintVotes = await this.voteRepository.countVotesInComplaint(req.body.complaintId, req.body.typeVote);
            if (complaintVotes > 9){
                complaint.status = Status.finished;
                this.complaintRepository.update(complaint);
            }
            return res.sendStatus(200);
        } catch (error) {
            return res.status(400).json({status: 'error', error})
        }
    }

}
