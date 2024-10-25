import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [MemberModule, PlaceModule]
})
export class ComponentsModule {}
