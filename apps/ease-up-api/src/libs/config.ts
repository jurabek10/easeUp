import { ObjectId } from 'bson';

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];

export const shapeIntoMogoObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};
