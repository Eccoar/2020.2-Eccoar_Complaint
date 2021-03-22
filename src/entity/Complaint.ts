import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IsLatitude, IsLongitude } from 'class-validator';
import { Category } from "./../utils/Category";
import { Status } from "./../utils/Status";

@Entity("tb_complaint")
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: false})
    name: string;

    @Column({length: 255, nullable: false})
    description: string;

    @Column({nullable: false, type: "double"})
    @IsLatitude()
    latitude: number;

    @Column({nullable: false, type: "double"})
    @IsLongitude()
    longitude: number;

    @Column({nullable: false})
    userId: number;

    @Column({type: "enum", enum: Category, nullable: false})
    category: Category;

    @CreateDateColumn({type: "datetime", nullable: false})
    creationDate: string;

    @Column({type: "datetime", nullable: true})
    closeDate: string;

    @Column({nullable: false, default: "open", type: "enum", enum: Status })
    status: Status;
}
