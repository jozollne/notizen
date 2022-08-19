import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notizen {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titel: string;

    @Column()
    text: string;

    @Column({nullable: true})
    ps: string;
}
