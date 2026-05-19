import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';
import { WsAdapter } from '@nestjs/platform-ws';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import { buildCloudinaryUrl } from './libs/utils/upload';

const sendUploadPlaceholder = (res: express.Response, target: string) => {
	const label = target === 'member' ? 'EaseUp profile' : 'EaseUp image';
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#f3f4f6"/><rect x="80" y="80" width="1040" height="640" rx="32" fill="#e5e7eb"/><text x="600" y="390" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="#6b7280">${label}</text><text x="600" y="455" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#9ca3af">Image unavailable</text></svg>`;

	res.setHeader('Cache-Control', 'public, max-age=3600');
	res.type('image/svg+xml').send(svg);
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.enableCors({ origin: true, credentials: true });

	['uploads/member', 'uploads/property', 'uploads/article'].forEach((directory) => {
		mkdirSync(directory, { recursive: true });
	});

	app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 }));
	app.use('/uploads', express.static(join(process.cwd(), 'uploads'), { fallthrough: true }));
	app.use('/uploads/:target/:imageName', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (req.method !== 'GET' && req.method !== 'HEAD') return next();

		const { target, imageName } = req.params;
		const imageUrl = buildCloudinaryUrl(target, imageName);

		if (imageUrl) {
			try {
				const response = await fetch(imageUrl);

				if (response.ok && response.body) {
					res.setHeader('Cache-Control', 'public, max-age=86400');
					res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
					return Readable.fromWeb(response.body as any).pipe(res);
				}
			} catch (error) {
				console.warn('Cloudinary image fetch failed', error);
			}
		}

		return sendUploadPlaceholder(res, target);
	});

	app.useWebSocketAdapter(new WsAdapter(app));
	await app.listen(process.env.PORT_API ?? process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
