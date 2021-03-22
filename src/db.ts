import { createConnection } from "typeorm";
import { ComplaintSeed } from '../db/seeds/ComplaintSeed';
import { Complaint } from './entity/Complaint';
import { Votes } from "./entity/Votes";


export async function  initializeDB(): Promise<void> {
    await createConnection().then(connection => {
        const complaintSeed = new ComplaintSeed();
        const seed = complaintSeed.seedDatabase();
        connection.transaction(async transactionalEntityManager => {
            const size = await transactionalEntityManager.count(Complaint);
            const voteSize = await transactionalEntityManager.count(Votes);
            if (size == 0) {
                console.log(">>>>>> POPULATE TABLE COMPLAINTS");
                await transactionalEntityManager.save(seed.complaints);
            }
            if (voteSize == 0) {
                console.log(">>>>>> POPULATE TABLE VOTES");
                await transactionalEntityManager.save(seed.votes);
            }
        })
    });
}