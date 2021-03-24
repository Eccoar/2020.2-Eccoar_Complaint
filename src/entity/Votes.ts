import { VoteType } from "./../utils/VoteType";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("tb_votes")
export class Votes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    userId: number;

    @Column({nullable: false})
    complaintId: number;

    @Column({type: "enum", enum:VoteType, nullable: false})
    typeVote: VoteType;
}
