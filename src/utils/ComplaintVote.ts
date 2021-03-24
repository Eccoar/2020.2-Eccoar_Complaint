import { ComplaintRepository } from "../repositories/ComplaintRepository";
import { Complaint } from "../entity/Complaint";

export interface ComplaintVote {
    validateVote(count: number, complaint: Complaint, repository: ComplaintRepository): Promise<void>;
}