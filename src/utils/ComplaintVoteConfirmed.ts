import { Complaint } from "../entity/Complaint";
import { ComplaintRepository } from "../repositories/ComplaintRepository";
import { ComplaintVote } from "./ComplaintVote";
import { Status } from './Status';

export default class ComplaintVoteConfirmed implements ComplaintVote{
    async validateVote(count: number, complaint: Complaint, repository: ComplaintRepository): Promise<void> {
        if (count > 9 && complaint.status !== 'finished'){
            const closeDate = new Date();
            complaint.status = Status.finished;
            complaint.closeDate = closeDate.toISOString();
            repository.update(complaint);
        }
    }
}
