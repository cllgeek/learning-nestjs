import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../DTOs/userDTO';
import { User } from '../entity/User';
import { PlatformService } from './platform.service';
import { RoleService } from './role.service';

@Injectable()
export class UserService {
    constructor(
			@InjectRepository(User)
			private readonly userRepo: Repository<User>,
			private platformService: PlatformService,
			private roleService: RoleService,
    ) {}

    async addUser(userDTO: UserDTO) {
			const user = new UserDTO();
			user.name = userDTO.name;
			user.age = userDTO.age;
			// user.platId  = data.platId; 不能只指定id，必须传入platform对象save的时候才会储存关联资料
			user.plat = await this.platformService.getPlatformById(userDTO.platId);
			// 先要取得role，再指给user物件下的roles，save时才会存储关联
			user.roles = await this.roleService.getRolesByIds(userDTO.roleIds);
			return await this.userRepo.save(user);
		}

		async getUsers(): Promise<User[]>{
			return await this.userRepo.find({relations: ['plat', 'roles']}); // relations指定载入关联属性，是阵列，可能有多个导出属性
		}

    async getUserById(id) {
			return await this.userRepo.findOne(id, {relations: ['plat', 'roles']});
			// relations指定载入关联属性，是阵列，可能有多个导出属性
    	// return await this.userRepo.findOneOrFail(id); // 以id搜寻，没找到会丢出例外
		}

		async updateUser(id, data: UserDTO){
			const user = new User();
			user.name = data.name;
			user.age = data.age;
			user.plat = await this.platformService.getPlatformById(data.platId);
			return await this.userRepo.update(id, user); // 用data里的值更新到数据库
	}
}
