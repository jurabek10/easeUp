import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId, Schema } from 'mongoose';
import { shapeIntoMogoObjectId } from '../../libs/config';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}
}
