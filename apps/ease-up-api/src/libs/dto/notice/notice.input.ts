import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { NoticeCategory } from '../../enums/notice.enum';
import { ObjectId } from 'mongoose';
@InputType()
export class NoticeInput {
	@IsNotEmpty()
	@Field(() => NoticeCategory)
	noticeCategory: NoticeCategory;

	@IsNotEmpty()
	@Length(3, 50)
	@Field(() => String)
	noticeTitle: string;

	memberId?: ObjectId;
}
