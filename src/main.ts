import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function main() {
  const PORT = process.env.PORT ?? ''

  const app = await NestFactory.create(AppModule, { rawBody: true })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'https://dedicado.digital',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  })

  const options = new DocumentBuilder()
    .setTitle('platform')
    .setDescription('platform api')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      description: 'Bearer',
    })
    .addApiKey({
      type: 'apiKey',
      in: 'header',
      description: 'apiKey',
    })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  await app
    .listen(PORT || 3000)
    .then(() => console.log(`🆙 server running on http://localhost:${PORT}`))
}
main()
