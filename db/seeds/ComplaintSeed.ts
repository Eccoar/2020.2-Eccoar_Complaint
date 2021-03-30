import { Complaint } from '../../src/entity/Complaint';
import { Category } from '../../src/utils/Category';

import { jsonData } from './complaintData';

export class ComplaintSeed {
    seedDatabase() {
        let complaints: Complaint[] = [];

        jsonData.forEach(data => {
            const complaint = new Complaint();
            complaint.latitude = data.latitude;
            complaint.longitude = data.longitude;
            complaint.status = data.status;
            complaint.category = Category.Hole;
            complaint.closeDate = data.closeDate;
            complaint.creationDate = data.creationDate;
            complaint.name = data.name;
            complaint.description = data.description;
            complaint.userId = data.userId;
            complaints.push(complaint);
        });
        return complaints;
    }

}