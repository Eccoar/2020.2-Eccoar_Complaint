import { VoteType } from "src/utils/VoteType";
import { getRepository } from "typeorm";
import { Votes } from "../entity/Votes";

export class VotesRepository {

    countVotesInComplaint(complaintId: number, typeVote: VoteType): Promise<number> {
        const repository = getRepository(Votes);
        return repository.count({complaintId, typeVote});
    }

    async saveVote(vote:Votes): Promise<void> {
        const repository = getRepository(Votes);
        repository.save(vote);
    }
}