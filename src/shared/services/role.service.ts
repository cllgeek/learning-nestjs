import { Injectable } from '@nestjs/common';
import { Role } from 'shared/entity/Role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDTO } from '../DTOs/roleDTO';

@Injectable()
export class RoleService {
    constructor(
			@InjectRepository(Role)
			private readonly roleRepo: Repository<Role>,
    ) {}

    async addRole(roleDto: RoleDTO){
			const role = new Role();
			role.roleName = roleDto.roleName;
			return await this.roleRepo.save(role);
    }

    async getRoleById(id){
			return await this.roleRepo.findOne(id);
    }

    async getRolesByIds(ids){ // 用在新增使用者时候要回传Role[]
			return await this.roleRepo.findByIds(ids);
    }

    async getRoles(){
			return await this.roleRepo.find({relations: ['users']}); // 载入关联属性
    }
}
