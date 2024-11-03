import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	PARKS = 'PARKS',
	LAKE = 'LAKE',
	COUNTRYSIDE = 'COUNTRYSIDE',
	HANOKS = 'HANOKS',
	AMAZING_POOLS = 'AMAZING_POOLS',
	CAMPING = 'CAMPING',
	PLAY = 'PLAY',
	FARMS = 'FARMS',
	SKIING = 'SKIING',
	LUXE = 'LUXE',
}
registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum PropertyStatus {
	ACTIVE = 'ACTIVE',
	RESERVED = 'RESERVED',
	DELETE = 'DELETE',
}
registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
});

export enum PropertyLocation {
	JONGNO = 'JONGNO',
	GANGNAM = 'GANGNAM',
	SEONGDONG = 'SEONGDONG',
	SONGPA = 'SONGPA',
	MAPO = 'MAPO',
	DOBONG = 'DOBONG',
	EUNPYEONG = 'EUNPYEONG',
	JUNG = 'JUNG',
	JAMSIL = 'JAMSIL',
	GWANGJIN = 'GWANGJIN',
	YEONGDEUNGPO = 'YEONGDEUNGPO',
	GANGDONG = 'GANGDONG',
}
registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
});
