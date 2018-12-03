import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { RoleService } from '../../shared/services/role.service';
import { RoleDTO } from '../../shared/DTOs/roleDTO';

@Controller()
export class RoleController {
	constructor(
			private readonly roleService: RoleService,
	) {}

	@Get('role/list')
  getRoles(){
    return this.roleService.getRoles();
  }

  @Get('role/:roleId')
  getRoleById(@Param('roleId') id){
    return this.roleService.getRoleById(id);
  }

  @Post('role')
  @UsePipes(new ValidationPipe({transform: true}))
  addRole(@Body() roleDTO: RoleDTO){
    return this.roleService.addRole(roleDTO);
  }
}
