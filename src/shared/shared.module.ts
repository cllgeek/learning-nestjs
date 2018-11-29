import { Module } from '@nestjs/common';
import { PlatformDTOValidationPipe } from './pipes/platformDTOValidationPipe';

@Module({
    providers: [PlatformDTOValidationPipe],
})
export class SharedModule {}
