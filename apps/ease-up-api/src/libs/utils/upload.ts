import { createWriteStream, mkdirSync } from 'fs';
import { dirname, join, parse, posix } from 'path';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'easeup';

const configureCloudinary = (): boolean => {
	const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

	if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) return false;

	cloudinary.config({
		cloud_name: CLOUDINARY_CLOUD_NAME,
		api_key: CLOUDINARY_API_KEY,
		api_secret: CLOUDINARY_API_SECRET,
		secure: true,
	});

	return true;
};

export const sanitizeUploadTarget = (target: string): string => {
	const safeTarget = String(target).replace(/^\/+|\/+$/g, '');

	if (!/^[a-zA-Z0-9_-]+$/.test(safeTarget)) {
		throw new Error('Invalid upload target');
	}

	return safeTarget;
};

export const buildUploadUrl = (target: string, imageName: string): string => {
	return posix.join('uploads', sanitizeUploadTarget(target), imageName);
};

export const buildCloudinaryUrl = (target: string, imageName: string): string | null => {
	if (!configureCloudinary()) return null;

	const publicId = posix.join(CLOUDINARY_FOLDER, sanitizeUploadTarget(target), parse(imageName).name);

	return cloudinary.url(publicId, {
		resource_type: 'image',
		secure: true,
	});
};

const uploadToCloudinary = (stream: Readable, target: string, imageName: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: posix.join(CLOUDINARY_FOLDER, sanitizeUploadTarget(target)),
				public_id: parse(imageName).name,
				resource_type: 'image',
				overwrite: true,
			},
			(error) => {
				if (error) return reject(error);
				resolve();
			},
		);

		stream.pipe(uploadStream);
	});
};

const uploadToLocalDisk = (stream: Readable, url: string): Promise<void> => {
	const uploadPath = join(process.cwd(), url);

	mkdirSync(dirname(uploadPath), { recursive: true });

	return new Promise((resolve, reject) => {
		stream
			.pipe(createWriteStream(uploadPath))
			.on('finish', () => resolve())
			.on('error', reject);
	});
};

export const storeImageUpload = async (stream: Readable, target: string, imageName: string): Promise<string> => {
	const url = buildUploadUrl(target, imageName);

	if (configureCloudinary()) {
		await uploadToCloudinary(stream, target, imageName);
		return url;
	}

	await uploadToLocalDisk(stream, url);
	return url;
};
