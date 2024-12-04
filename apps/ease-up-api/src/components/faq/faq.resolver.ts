import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Faq } from '../../libs/dto/faq/faq';
import { FaqInput } from '../../libs/dto/faq/faq.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class FaqResolver {
	constructor(private readonly faqService: FaqService) {}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Faq)
	public async createFaq(@Args('input') input: FaqInput, @AuthMember('_id') memberId: ObjectId): Promise<Faq> {
		console.log('Mutation: createFaq');
		input.memberId = memberId;
		return await this.faqService.createFaq(input);
	}
}
