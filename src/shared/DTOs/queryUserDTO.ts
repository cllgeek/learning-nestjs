import { IsString, IsNumber } from 'class-validator';

export class UserQueryDTO{
	@IsString()
	name: string;

	@IsNumber()
	page: number;

	@IsNumber()
	pageSize: number;
}
