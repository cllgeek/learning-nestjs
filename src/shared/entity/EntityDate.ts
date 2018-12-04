import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class EntityDate {

	@PrimaryColumn()
	entityDateId: number;

	@Column({
		nullable: true,
	})
	LastUpdatedDate: Date;

	@Column({
		nullable: true,
	})
	createDate: Date;

}
