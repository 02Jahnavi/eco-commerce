import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // ✅ Set global API prefix so all routes start with /api
  app.setGlobalPrefix('api');

  // ✅ Enable CORS for frontend (React running on localhost:5173)
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);
  console.log(`🚀 Backend running on http://localhost:3000`);
}
bootstrap();
