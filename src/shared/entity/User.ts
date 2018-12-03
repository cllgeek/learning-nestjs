import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, ManyToMany, JoinTable} from 'typeorm';
import { Platform } from './Platform';
import { Role } from './Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne( type => Platform, platform => platform.users, {
      onDelete: 'NO ACTION', // 如果刪除Platform，不会一并把UserEntity刪除，另有CASCADE就会
    }) // 设定type为Platform，inverse property为Platform Entity里面的users属性，这个属性不会存到数据库
    plat: Platform;

    @RelationId((user: User) => user.plat)
		platId: number;

		@ManyToMany( type => Role, role => role.users ) // 建立bi-directional多对多
		@JoinTable() // 告诉typeorm要建立join table
		roles: Role[];
}
