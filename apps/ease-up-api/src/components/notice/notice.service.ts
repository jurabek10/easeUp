import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { NoticeInput } from '../../libs/dto/notice/notice.input';
import { Notice } from '../../libs/dto/notice/notice';
import { Message } from '../../libs/enums/common.enum';
import { NoticeUpdate } from '../../libs/dto/notice/notice.update';
import { T } from '../../libs/types/common';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import * as moment from 'moment';

@Injectable()
export class NoticeService {
	constructor(@InjectModel('Notice') private readonly noticeModel: Model<Notice>) {}

	public async createNotice(input: NoticeInput): Promise<Notice> {
		try {
			const result = await this.noticeModel.create(input);
			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATED_FAILED);
		}
	}

	public async updateNotice(memberId: ObjectId, input: NoticeUpdate): Promise<Notice> {
		let { noticeStatus, blockedAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			memberId: memberId,
			noticeStatus: NoticeStatus.ACTIVE,
		};

		if (noticeStatus === NoticeStatus.BLOCKED) blockedAt = moment().toDate();
		else if (noticeStatus === NoticeStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.noticeModel.findByIdAndUpdate(search, input, { new: true }).exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		return result;
	}
}
