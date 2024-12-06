import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model, ObjectId, Schema } from 'mongoose';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { Message } from '../../libs/enums/common.enum';
import { NotificationStatus } from '../../libs/enums/notification.enum';

@Injectable()
export class NotificationService {
	constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}
	public async createNotification(input: NotificationInput): Promise<Notification> {
		const notification: NotificationInput = {
			notificationType: input.notificationType,
			notificationGroup: input.notificationGroup,
			notificationTitle: input.notificationTitle,
			authorId: input.authorId,
			receiverId: input.receiverId,
			productId: input.productId,
			articleId: input.articleId,
		};
		try {
			const result = this.notificationModel.create(notification);
			return result;
		} catch (err) {
			console.log('Error: notificationService', err.message);
			throw new BadRequestException(Message.CREATED_FAILED);
		}
	}

	public async deleteNotification(input): Promise<any> {
		const search: any = {
			authorId: input.authorId,
			receiverId: input.receiverId,
			productId: input.productId,
			articleId: input.articleId,
		};
		await this.notificationModel.findOneAndDelete(search).exec();
	}

	public async updateNotification(memberId: ObjectId, input: NotificationUpdate): Promise<Notification> {
		const { _id } = input;
		const result = await this.notificationModel
			.findOneAndUpdate(
				{
					_id: _id,
					receiverId: memberId,
					notificationStatus: NotificationStatus.WAIT,
				},
				input,
				{ new: true },
			)
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}
}
