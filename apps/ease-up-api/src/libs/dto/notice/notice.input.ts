import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { NoticeCategory } from '../../enums/notice.enum';
import { ObjectId } from 'mongoose';
import { Direction } from '../../enums/common.enum';
import { availabeNoticSorts } from '../../config';
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

@InputType()
export class NoticesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availabeNoticSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;
}
