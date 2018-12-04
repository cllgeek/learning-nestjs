import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserDTO } from '../DTOs/userDTO';
import { User } from '../entity/User';
import { PlatformService } from './platform.service';
import { RoleService } from './role.service';
import { UserQueryDTO } from '../DTOs/queryUserDTO';

@Injectable()
export class UserService {
    constructor(
			// @InjectRepository(User) // 注入 typeorm repository
			// private readonly userRepo: Repository<User>,

			// 注入EntityManager可以指定Connection
			// 会用default connection，多个connection要参考nestjs官网
			@InjectEntityManager()
			private readonly em: EntityManager,
			private platformService: PlatformService,
			private roleService: RoleService,
    ) {}

    // async addUser(userDTO: UserDTO) {
		// 	const user = new UserDTO();
		// 	user.name = userDTO.name;
		// 	user.age = userDTO.age;
		// 	// user.platId  = data.platId; 不能只指定id，必须传入platform对象save的时候才会储存关联资料
		// 	user.plat = await this.platformService.getPlatformById(userDTO.platId);
		// 	// 先要取得role，再指给user物件下的roles，save时才会存储关联
		// 	user.roles = await this.roleService.getRolesByIds(userDTO.roleIds);
		// 	return await this.userRepo.save(user);
		// }

		async addUser(data: UserDTO): Promise<User>{
			const user = new User();

			user.name = data.name;
			user.age = data.age;

			// // user.platId  = data.platId; 不能只指定id，必须传入platform对象save的时候才会储存关联资料
			// user.dep = await this.depService.getDepById(data.depId);
			// // 先要取得role，再指给user物件下的roles，save时才会存储关联
			// user.roles = await this.roleService.getRolesByIds(data.roleIds);
			// return await this.userRepo.save(user);
			let userId;
			await this.em.createQueryBuilder()
				.insert() // 不接受任何参数
				.into(User) //
				.values(user) // 先更新关联以外的属性
				.execute() // 必须execute才会产生SQL送到DB
				.then(async (result) => {
						Logger.log(result); // 到console看回传的格式
						userId = result.identifiers[0].id; // 取得新增后回传的id
						// 以下更新关联属性
						await this.em.createQueryBuilder()
						.relation(User, 'roles')
						.of(userId)
						.add(data.roleIds)
						.then(async () => {
								await this.em.createQueryBuilder()
									.relation(User, 'plat')
									.of(userId)
									.set(data.platId);
						});
				});

			return this.getUserById(userId);
		}

		async getUsers(pageInfo: UserQueryDTO): Promise<User[]>{
			return await this.em
				.createQueryBuilder(User, 'u')
				.leftJoinAndSelect('u.roles', 'r')
				.leftJoinAndSelect('u.plat', 'p')
				.select([
						'u.id',
						'u.name',
						'u.age',
						'p.id',
						'p.platformname',
						'r.id',
						'r.roleName',
					])
					.orderBy('p.platformname', 'ASC')
					.addOrderBy('u.name')
					.skip((pageInfo.page - 1) * pageInfo.pageSize)
					.take(pageInfo.pageSize) // 取pageSize
					.cache(60000) // 1 min內
					.getMany();
	 	}

    // async getUserById(id) {
		// 	return await this.userRepo.findOne(id, {relations: ['plat', 'roles']});
		// 	// relations指定载入关联属性，是阵列，可能有多个导出属性
    // 	// return await this.userRepo.findOneOrFail(id); // 以id搜寻，没找到会丢出例外
		// }

		async deleteUser(id){
			const userDeleted = this.getUserById(id); // 先把原本的User存起來
			return this.em.createQueryBuilder()
				.delete()
				.from(User)
				.whereInIds(id) // 指定id for delete
				.execute()
				.then(result => userDeleted); // 回传raw沒有资料
		}

		async getUserById(userId): Promise<User>{
			// 载入roles导出属性
			// 设定eager=true后要把plat拿掉，重复载入SQL语法错误
			// return await this.userRepo.findOne(id, {relations: ['plat', 'roles']});
			// return await this.userRepo.findOneOrFail(id); // 以id搜寻，沒找到会丟出例外
			return await this.em
				.createQueryBuilder(User, 'u')
				.leftJoinAndSelect('u.roles', 'r')
				.leftJoinAndSelect('u.plat', 'p')
				.whereInIds(userId)
				.select([
					'u.id',
					'u.name',
					'u.age',
					'p.id',
					'p.platformname',
					'r.id',
					'r.roleName',
					])
				.getOne(); // 单笔使用getOne
		}

		// async updateUser(id, data: UserDTO){
		// 	const user = new User();
		// 	user.name = data.name;
		// 	user.age = data.age;
		// 	user.plat = await this.platformService.getPlatformById(data.platId);
		// 	return await this.userRepo.update(id, user); // 用data里的值更新到数据库
		// }

		// async getUsersByPlatformName(platformName: string) {
		// 	return await this.em
		// 		.createQueryBuilder('u')
		// 		.leftJoinAndSelect('u.roles', 'r')
		// 		.leftJoinAndSelect('u.plat', 'p')
		// 		.where('p.isActive = :isActive', {isActive: true})
		// 		.andWhere('p.platformName like :name', { name: `%${platformName.toLocaleLowerCase()}`})
		// 		.orderBy('age', 'DESC')
		// 		.getMany();
		// }

		// async getUsersByRoleName(query: UserQueryDTO) {
		// 	return await this.em
		// 		.createQueryBuilder('u')
		// 		.leftJoinAndSelect('u.roles', 'r')
		// 		.leftJoinAndSelect('u.plat', 'p')
		// 		// 以roleName作为筛选条件
		// 		.where('r.roleName like :name', { name: `%${query.name.toLowerCase()}%`})
		// 		.orderBy('u.name', 'ASC')
		// 		// Orderby也可以串连
		// 		.addOrderBy('u.age')
		// 		// 跳过数量，第一頁就为0，第二页跳过pageSize
		// 		.skip((query.page - 1) * query.pageSize)
		// 		.take(query.pageSize) // 取pageSize参数
		// 		.select([
		// 			'u.id',
		// 			'u.age',
		// 			'u.name',
		// 			'r.id',
		// 			'r.roleName',
		// 		])
		// 		.addSelect('u.password')
		// 		.getManyAndCount(); // 回传record 并 count数量
		// }

		// async updateUserPlatById(userId, platId){ // 传入userId及platId
		// 	await this.em.createQueryBuilder()
		// 		.relation(User, 'plat') // 指定载入relation
		// 		.of(userId) // 找对应的entity，可以是id或是queryed entity
		// 		.set(platId); // 更新(或是新增)platId
		// 		// .then(result => result); 回传void
		// 	return await this.em.findOne(userId, {relations: ['plat', 'roles']}); // 回传结果
		// }

		// async updateUserRolesByIds(userId, data: UserDTO){
		// 	// 更新roles，必需先取的数据库现有的资料
		// 	const user = await this.em.findOne(userId, {relations: ['roles']});
		// 	Logger.log(user);
		// 	await this.em.createQueryBuilder()
		// 		.relation(User, 'roles') // 指定载入relation
		// 		.of(userId) // 找对应的entity，可以是id或是queryed entity
		// 		// 第一个参数是要新增的roles，第二個参数是要移除的roles
		// 		// 当然可以用lodash对阵列做操作，得到新增的阵列跟移除的阵列
		// 		// 但builder API一次只能有add或是remove，所以用addAndRemove是最快的
		// 		.addAndRemove(data.roleIds, user.roles.map(role => role.id));
		// 		// .then(result => return result); 回传void
		// 	return await this.em.findOne(userId, {relations: ['plat', 'roles']});
		// }

		// async updateUserById(userId, data: UserDTO){
		// 	const user = await this.em.findOne(userId, {relations: ['roles']});
		// 	await this.em.createQueryBuilder()
		// 						.relation(User, 'roles')
		// 						.of(userId)
		// 						.addAndRemove(data.roleIds, user.roles.map(role => role.id))
		// 						.then(async () => { // 要串
		// 							await this.em.createQueryBuilder()
		// 								.relation(User, 'plat')
		// 								.of(userId)
		// 								.set(data.platId);
		// 					 });
		// 	await this.em.createQueryBuilder() // 更新非relation相关资料
		// 						.update(User) // 指定update哪一个entity
		// 						.set({ // 更新资料
		// 							name: data.name,
		// 							age: data.age,
		// 						})
		// 						// whereInIds是helper method
		// 						// 原本应为
		// 						// .where('id = :id', {id: userId})
		// 						.whereInIds(userId)
		// 						// .printSql() 可以用来除错
		// 						.execute(); // 执行
		// 	return await this.em.findOne(userId, {relations: ['plat', 'roles']});
		// }
}
