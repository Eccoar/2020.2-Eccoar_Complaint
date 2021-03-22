import { getRepository } from "typeorm";
import { Complaint } from "../entity/Complaint";

export class ComplaintRepository {

    getById(id: number): Promise<Complaint> {
        const repository = getRepository(Complaint);
        return repository.findOne({ id });
    }

    createComplaint(complaint: Complaint): Promise<Complaint> {
        const repository = getRepository(Complaint);
        return repository.save(complaint);
    }

    async update(complaint: Complaint): Promise<void>{
        const repository = getRepository(Complaint)
        repository.update(complaint.id, complaint);
    }

    async getAllComplaints(skip: number, take: number, orderDate: string): Promise<any> {
        const repository = getRepository(Complaint);
        const [result, count] = await repository.findAndCount({
            skip: skip * take,
            take: take,
            order: {
                creationDate: orderDate as ("ASC" | "DESC")
            }
        });
        const response = {
            complaints: result,
            count
        }
        return response;
    }
}