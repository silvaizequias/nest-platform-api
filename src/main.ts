import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const PORT = process.env.PORT

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://sistema.localhost:3000',
      'https://dedicado.digital',
      'https://sistema.dedicado.digital',
      'http://dedicated-support-management-api.sa-east-1.elasticbeanstalk.com',
      'http://dedicated-service-management-api.sa-east-1.elasticbeanstalk.com',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })

  const options = new DocumentBuilder()
    .setTitle('Platform Management API')
    .setDescription('Platform Management API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      description: 'authorization',
    })
    .addApiKey({
      type: 'apiKey',
      in: 'header',
      description: 'authorization',
    })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('', app, document)

  await app.listen(PORT || 3100)
}
bootstrap()
