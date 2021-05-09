import { getRepository } from 'typeorm';
import { Votes } from '@entity/Votes';
import { Complaint } from '@entity/Complaint';
import { Category } from '../utils/Category';
import { ComplaintWithVote } from '../utils/ComplaintWithVote';
import { Status } from '@utils/Status';

export class ComplaintRepository {
	getById(id: number): Promise<Complaint> {
		const repository = getRepository(Complaint);
		return repository.findOne({ id });
	}

	createComplaint(complaint: Complaint): Promise<Complaint> {
		const repository = getRepository(Complaint);
		return repository.save(complaint);
	}

	async deleteComplaint(id: number): Promise<void> {
		const repository = getRepository(Complaint);
		repository.delete(id);
	}

	async update(complaint: Complaint): Promise<void> {
		const repository = getRepository(Complaint);
		repository.update(complaint.id, complaint);
	}

	async getAllComplaints(
		skip: number,
		take: number,
		orderDate: string,
	): Promise<{ complaints: Complaint[]; count: number }> {
		const repository = getRepository(Complaint);
		const [result, count] = await repository.findAndCount({
			skip: skip * take,
			take: take,
			order: {
				creationDate: orderDate as 'ASC' | 'DESC',
			},
		});
		const response = {
			complaints: result,
			count,
		};
		return response;
	}

	async getComplaintsWithVotes(
		userId: string,
		skip: number,
		take: number,
		status: Status[],
		category: Category[],
	): Promise<ComplaintWithVote[]> {
		const repository = getRepository(Complaint);
		const query = repository
			.createQueryBuilder('complaint')
			.leftJoinAndSelect(
				Votes,
				'vote',
				'vote.complaintId = complaint.id and vote.userId = :userId',
				{ userId },
			)
			.limit(take)
			.offset(skip * take);

		if (status?.length) {
			query
				.andWhere('complaint.status IN (:...status)')
				.setParameter('status', status);
		}
		if (category?.length) {
			query
				.andWhere('complaint.category IN (:...category)')
				.setParameter('category', category);
		}

		return await query.getRawMany<ComplaintWithVote>();
	}

	async getComplaintById(
		userId: string,
		complaintId: number,
	): Promise<ComplaintWithVote> {
		const repository = getRepository(Complaint);

		const getComplaintVote = await repository
			.createQueryBuilder('complaint')
			.leftJoinAndSelect(
				Votes,
				'vote',
				'vote.complaintId = complaint.id and vote.userId = :userId',
				{ userId },
			)
			.where('complaint.id = :complaintId', { complaintId })
			.getRawOne<ComplaintWithVote>();

		return getComplaintVote;
	}

	async getWaitComplaints(category: Category): Promise<Complaint[]> {
		const repository = getRepository(Complaint);
		return await repository.find({
			where: { category: category, status: 'wait' },
		});
	}
}
