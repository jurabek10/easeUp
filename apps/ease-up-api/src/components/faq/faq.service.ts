import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq } from '../../libs/dto/faq/faq';
import { FaqInput } from '../../libs/dto/faq/faq.input';
import { Message } from '../../libs/enums/common.enum';

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
}
