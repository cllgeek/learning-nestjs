import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeInsert, BeforeUpdate} from 'typeorm';
import { User } from './User';
import { EntityDate } from './EntityDate';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    roleName: string;

    @ManyToMany( type => User, user => user.roles)
		users: User[];

		@Column(type => EntityDate) // 指定column为EntityDate Entity
		entityDate: EntityDate; // 型别为EntityDate

		@BeforeInsert()
    updateDatesWhenInsert(){
			// 新增entity前指定现在时间给下列属性
			this.entityDate = {
				entityDateId: 0,
				createDate: new Date(),
				LastUpdatedDate: new Date(),
			};
    }

    @BeforeUpdate()
    updateDateWhenUpdate(){
			// 更新entity前更新LastUpdatedDate
			this.entityDate.LastUpdatedDate = new Date();
    }
}
