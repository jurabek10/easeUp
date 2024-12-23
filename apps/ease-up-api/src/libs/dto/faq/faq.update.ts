import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ObjectId } from 'mongoose';
import { FaqStatus } from '../../enums/faq.enum';

@InputType()
export class FaqUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => FaqStatus, { nullable: true })
	faqStatus?: FaqStatus;

	@IsOptional()
	@Length(3, 50)
	@Field(() => String, { nullable: true })
	faqTitle?: string;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	faqContent?: string;

	blockedAt?: Date;

	deletedAt: Date;
}
