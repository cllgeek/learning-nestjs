import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { User } from './User';

@Entity('platform') // 指定table name
export class Platform {
    // 每新增一个的时候id+1
    @PrimaryGeneratedColumn()
    id: number;
    // @Column为对应的数据库列，或是传入Column Options物件
    @Column()
    platformname: string;

    // 传入Column Options物件设定mapping的列位属性
    @Column({
        type: 'varchar',
        length: 50,
        default: '123',
    })
    title: string;

    @Column()
     url: string;

    @Column({
      default: true, // 给预设值
    })
		isActive: boolean;

		@OneToMany( type => User, user => user.plat ) // type指定User， 第二個参数是function预设传入第一个参数的type，这边需要设定inverse屬性，user entity里的dep屬性，这个属性不会存到数据库
    users: [];
}
