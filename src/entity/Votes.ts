import { VoteType } from "./../utils/VoteType";
import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("tb_votes")
export class Votes {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    complaintId: number;

    @Column({type: "enum", enum:VoteType, nullable: false})
    typeVote: VoteType;
}
