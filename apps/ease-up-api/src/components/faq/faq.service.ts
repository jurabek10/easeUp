import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { AllFaqsInquiry, FaqInput } from '../../libs/dto/faq/faq.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { FaqStatus } from '../../libs/enums/faq.enum';
import { lookupMember } from '../../libs/config';

@Injectable()
export class FaqService {
	constructor(@InjectModel('Faq') private readonly faqModel: Model<Faq>) {}

	public async createFaq(input: FaqInput): Promise<Faq> {
		try {
			const result = await this.faqModel.create(input);
			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATED_FAILED);
		}
	}

	public async getAllFaqs(input: AllFaqsInquiry): Promise<Faqs> {
		const { faqStatus, faqCategory } = input.search;
		const match: T = {};
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		if (faqStatus) match.faqStatus = faqStatus;
		if (faqCategory) match.faqCategory = faqCategory;
		const result = await this.faqModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}
}
