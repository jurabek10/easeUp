import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { AllFaqsInquiry, FaqInput } from '../../libs/dto/faq/faq.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';

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

	@UseGuards(WithoutGuard)
	@Query((returns) => Faqs)
	public async getAllFaqs(@Args('input') input: AllFaqsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Faqs> {
		console.log('Query: getAllFaqs');
		return await this.faqService.getAllFaqs(input);
	}
}
