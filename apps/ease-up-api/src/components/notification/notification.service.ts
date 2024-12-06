import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';

@Injectable()
export class NotificationService {
	updateNotification(
		memberId: Schema.Types.ObjectId,
		input: NotificationUpdate,
	): Notification | PromiseLike<Notification> {
		throw new Error('Method not implemented.');
	}
}
