import {Entity, Column} from 'typeorm';

@Entity()
export class EntityDate {

	@Column({
		nullable: true,
	})
	LastUpdatedDate: Date;

	@Column({
		nullable: true,
	})
	createDate: Date;

}
