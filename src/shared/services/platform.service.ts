import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformDTO } from '../DTOs/platformDTO';
import { Platform } from '../entity/Platform';

@Injectable()
export class PlatformService {
    constructor(
        @InjectRepository(Platform)
        private readonly platformRepo: Repository<Platform>,
    ){}

    async addPlatform(data: PlatformDTO){
			const platformData = new Platform();
			platformData.platformname = data.platformname;
			platformData.url = data.url;
			platformData.title = data.title;
			return await this.platformRepo.save(platformData);
		}

		async getPlatforms(): Promise<Platform []> {
			return await this.platformRepo.find(); // find 没传入参数代表获取全部资料
		}

		async getPlatformById(id): Promise<Platform> {
			return await this.platformRepo.findOne(id); // 以id搜寻，沒找到return null
		}

		async updatePlatform(id, data: PlatformDTO) {
			return await this.platformRepo.update(id, data); // 用data里的值更新到资料库
		}

		async deletePlatform(id) {
				return this.platformRepo.delete(id); // delete只需要传入id
		}

}
