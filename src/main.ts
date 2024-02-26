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
    origin: ['http://localhost:3210', 'https://dedicado.digital'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })

  const options = new DocumentBuilder()
    .setTitle('management')
    .setDescription('management')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      description: 'authorization',
    })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('', app, document)

  await app.listen(PORT || 3000)
}
bootstrap()
