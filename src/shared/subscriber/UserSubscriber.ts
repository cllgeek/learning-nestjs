import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Logger } from '@nestjs/common';
import { User } from '../entity/User';
import { Role } from '../entity/Role';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo(){
        return User;
    }

    async beforeInsert(event: InsertEvent<User>){
        Logger.log(`-----Before Insert------`);
				    Logger.log(event.entity); // 显示insert之前entity的信息
				    event.entity.entityDate = {
							entityDateId: 0,
							createDate: new Date(),
							LastUpdatedDate: new Date(),
						};
    }

    async afterInsert(event: InsertEvent<User>){
        Logger.log(`-----After Insert------`);
        // 希望在insert user后自动加入user权限
        // 使用Subscriber的好处是可以从event取得entity manager物件
        // 进而可以使用querybuilder做任何SQL操作
        const role = await event.manager.createQueryBuilder(Role, 'r')
                   .where('r.roleName = :name', {name: 'CTO'})
									 .getOne();
        // 要加入user使用relationquerybuilder
        event.manager.createQueryBuilder(User, 'u')
                     .relation('roles')
                     .of(event.entity)
                     .add(role);
    }
}
