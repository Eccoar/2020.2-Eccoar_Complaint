import { Votes } from '../../src/entity/Votes';
import { VoteType } from '../../src/utils/VoteType';
import { Complaint } from '../../src/entity/Complaint';
import { Category } from '../../src/utils/Category';

import { jsonData } from './complaintData';
import { voteData } from './voteData';
import { Status } from '../../src/utils/Status';

export class ComplaintSeed {
    seedDatabase() {
        const complaints: Complaint[] = [];
        const votes: Votes[] = [];

        voteData.forEach(data => {
            const vote = new Votes();
            vote.complaintId = data.complaintId;
            vote.typeVote = data.typeVote as VoteType;
            vote.userId = data.userId;
            votes.push(vote);
        });

        jsonData.forEach(data => {
            const complaint = new Complaint();
            complaint.latitude = data.latitude;
            complaint.longitude = data.longitude;
            complaint.status = data.status as Status;
            complaint.category = Category.Hole;
            complaint.closeDate = data.closeDate;
            complaint.creationDate = data.creationDate;
            complaint.name = data.name;
            complaint.description = data.description;
            complaint.userId = data.userId;
            complaints.push(complaint);
        });
        return {complaints, votes};
    }

}